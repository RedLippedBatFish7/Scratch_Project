const db = require('../../database/pg_model.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const menuController = {};

menuController.createDish = async (req, res, next) => {
  // Checking the usertype to decide which controller it has to pass through (createSeller vs createBuyer)

  try {
    const props = [
      'sellerId',
      'dish_name',
      'description',
      'price',
      'quantity_available',
    ];
    const values = [];
    // storing the values of the above keys which are received in the body of the request in the values array
    for (let i = 0; i < props.length; i++) {
      values.push(req.body[props[i]]);
    }

    const sqlQuery = `INSERT INTO public.dishes 
    (fk_seller_id, dish_name, description, price, quantity_available) 
    VALUES ($1, $2, $3, $4, $5) 
    RETURNING *;`;
    const data = await db.query(sqlQuery, values);
    console.log(data.rows[0]);
    res.locals.dish = data.rows[0];

    return next();
  } catch (error) {
    console.log(error.detail);
    return next({ message: error.detail });
  }
};

menuController.getSellerMenu = async (req, res, next) => {
  //const { userId } = req.body;
  const userId = req.body.sellerId || req.cookies.userId;
  const para = [userId];
  console.log(para);

  //will be an inner join table
  //templete
  /*
  const text = 'SELECT species.*, planets.name AS homeworld FROM species LEFT OUTER JOIN planets ON species.homeworld_id = planets._id WHERE species._id = $1';
  const text = `SELECT people.*, species.name AS species, planets.name AS homeworld
   FROM people LEFT OUTER JOIN species ON people.species_id = species._id LEFT OUTER JOIN planets ON people.homeworld_id = planets._id;`;
  const text2 = `SELECT f.title, f._id AS id FROM films f INNER JOIN people_in_films pif ON f._id=pif.film_id WHERE pif.person_id=$1;`;
  */

  // sellers need to be able to have 0 dishes, so I'm splitting this query
  // currently if no dishes for a seller, they don't show up at all because of the join
  const sqlQuery = `select d.pk_dish_id, d.fk_seller_id, d.dish_name, d.description, d.price, d.quantity_available,s.kitchen_name, s.pickup_window_start, s.pickup_window_end, s.cuisine, s.market_enabled, s.seller_street_name, s.seller_city, s.seller_state, s.seller_zip_code
  FROM public.sellers s LEFT JOIN public.dishes d ON s.pk_seller_id = d.fk_seller_id WHERE S.pk_seller_id = $1;`;
  try {
    const data = await db.query(sqlQuery, para);
    // if (data.rows.length === 0) {
    //   res.locals.sellerMenu = null;
    //   return next();
    // }
    console.log('data.rows==>', data.rows);
    const kitchenMenu = {};
    kitchenMenu.kitchenName = data.rows[0].kitchen_name;
    kitchenMenu.pickup_window_start = data.rows[0].pickup_window_start;
    kitchenMenu.pickup_window_end = data.rows[0].pickup_window_end;
    kitchenMenu.cuisine = data.rows[0].cuisine;
    kitchenMenu.market_enabled = data.rows[0].market_enabled;
    kitchenMenu.address = {
      seller_street_name: data.rows[0].seller_street_name,
      seller_city: data.rows[0].seller_city,
      seller_state: data.rows[0].seller_state,
      seller_zip_code: data.rows[0].seller_zip_code,
    };

    kitchenMenu.dishes = {};

    data.rows.forEach((dishObj) => {
      const dishId = dishObj['pk_dish_id'];
      const dish = {};
      dish.name = dishObj.dish_name;
      dish.description = dishObj.description;
      dish.price = dishObj.price;
      dish.quantity = dishObj.quantity_available;
      kitchenMenu.dishes[dishId] = dish;
      //console.log("dish==>", dish)4
    });

    //console.log('kitchenMenu==>', kitchenMenu);

    res.locals.sellerMenu = kitchenMenu;
    return next();
  } catch (error) {
    return next({ message: error.message });
  }
};

menuController.updateMenu = async (req, res, next) => {
  const userId = req.cookies.userId;
  console.log('userId==>', userId);
  //const para = [userId];
  const {
    kitchenName,
    menuChanges,
    windowTimes,
    address,
    cuisine,
    market_enabled,
  } = req.body;

  try {
    if (kitchenName) {
      const para = [kitchenName];
      const sqlQuery = `UPDATE public.sellers
      SET kitchen_name = $1
       WHERE pk_seller_id=${userId};`;
      const data = await db.query(sqlQuery, para);
    }

    for (let dishId in menuChanges) {
      if (menuChanges[dishId]) {
        if (Object.keys(menuChanges[dishId]).length === 0) {
          const sqlQuery = `DELETE FROM public.dishes
      WHERE pk_dish_id = ${dishId} ;`;
          const data = await db.query(sqlQuery);
        } else if (dishId < 0) {
          const para = [];
          const props = ['name', 'description', 'price', 'quantity'];
          // storing the values of the above keys which are received in the body of the request in the values array
          for (let i = 0; i < props.length; i++) {
            //console.log('req.body.menuChanges[dishId][props[i]]==>', req.body.menuChanges[dishId][props[i]]);
            para.push(req.body.menuChanges[dishId][props[i]]);
          }
          para.push(userId);
          //console.log('para==>', para);
          const sqlQuery = `INSERT INTO public.dishes (dish_name, description, price, quantity_available, fk_seller_id)
           VALUES($1, $2, $3, $4, $5);`;
          const data = await db.query(sqlQuery, para);

        }
        // if update
        else {
          const cache = Object.entries(req.body.menuChanges[dishId]);
          cache.forEach(([key, value], i) => {
            if (key === 'name') {
              cache[i][0] = 'dish_name';
            }
            if (key === 'quantity') {
              cache[i][0] = 'quantity_available';
            }
            if (typeof cache[i][1] === 'string')
              cache[i][1] = cache[i][1].replaceAll("'", "''");
          });
          console.log('2cache==>', cache);

          let text = cache.reduce((str, [key, value]) => {
            str += key + ' = ' + "'" + value + "', ";
            return str;
          }, '');

          console.log('-0-------------------------------', dishId);
          console.log(text.slice(0, -2));

          const sqlQuery = `UPDATE public.dishes
         SET ${text.slice(0, -2)}
          WHERE pk_dish_id=${dishId};`;

          // `UPDATE public.dishes
          //  SET dish_name = 'New Dishy', description = 'It's new! Try it!', price = '$4.40', quantity_available = '2'
          //   WHERE pk_dish_id=44;`;

          const data = await db.query(sqlQuery);
        }
      }
    }

    if (windowTimes) {
      if (windowTimes.pickup_window_start) {
        const para = [windowTimes.pickup_window_start];
        const sqlQuery = `UPDATE public.sellers
       SET pickup_window_start = $1
       WHERE pk_seller_id=${userId};`;
        const data = await db.query(sqlQuery, para);
      }

      if (windowTimes.pickup_window_end) {
        const para = [windowTimes.pickup_window_end];
        const sqlQuery = `UPDATE public.sellers
    SET pickup_window_end = $1
     WHERE pk_seller_id=${userId};`;
        const data = await db.query(sqlQuery, para);
      }
    }

    if (address) {
      // if address, guarantee entire address sent
      if (address.seller_street_name) {
        const para = [address.seller_street_name];
        const sqlQuery = `UPDATE public.sellers
       SET seller_street_name = $1
       WHERE pk_seller_id=${userId};`;
        const data = await db.query(sqlQuery, para);
      }

      console.log(address);
      if (address.seller_state) {
        console.log('seller state!');
        const para = [address.seller_state];
        const sqlQuery = `UPDATE public.sellers
    SET seller_state = $1
     WHERE pk_seller_id=${userId};`;
        const data = await db.query(sqlQuery, para);
      }

      if (address.seller_city) {
        const para = [address.seller_city];
        const sqlQuery = `UPDATE public.sellers
    SET seller_city = $1
     WHERE pk_seller_id=${userId};`;
        const data = await db.query(sqlQuery, para);
      }

      if (address.seller_zip_code) {
        const para = [address.seller_zip_code];
        const sqlQuery = `UPDATE public.sellers
    SET seller_zip_code = $1
     WHERE pk_seller_id=${userId};`;
        const data = await db.query(sqlQuery, para);
      }
    }

    if (cuisine) {
      const para = [cuisine];
      const sqlQuery = `UPDATE public.sellers
      SET cuisine = $1
       WHERE pk_seller_id=${userId};`;
      const data = await db.query(sqlQuery, para);
    }

    if (market_enabled !== null && market_enabled !== undefined) {
      const para = [market_enabled];
      const sqlQuery = `UPDATE public.sellers
      SET market_enabled  = $1
       WHERE pk_seller_id=${userId};`;
      const data = await db.query(sqlQuery, para);
    }

    res.locals.message = 'Menu updated successfully!';
    return next();
  } catch (e) {
    console.log(e);
    return next({ message: e.message });
  }
};

module.exports = menuController;

// windowTimes: {
//   pickup_window_start, pickup_window_end;
// }

// address: {
//   seller_street_name, seller_street_number, seller_city, seller_zip_code;
// }

// cuisine: string;
// market_enabled: true / false;

/*
Receive a post req from:
**db/updatemenu**
and a body of changes to the kitchenName or menu:
```{ kitchenName, menuChanges: {...} }```
with the changes object looking like:
```menuChanges: { 14: {...}, 12: {...}, -1: {...} }```
with each subobject looking like one of the below:
```{ 14: {} }``` <-- delete
```{ 12: { name, description, price, quantity }``` <-- update
```{ -1: { name, description, price, quantity }``` <-- insert

---*/

// DON'T KNOW HOW TO HANDLE WHEN pk_dish_id IS A NEGATIVE NUMBER
// const sqlQuery = `INSERT INTO public.dishes (pk_dish_id, dish_name , description, price, quantity_available)
// VALUES($1, $2, $3, $4, $5)
// ON CONFLICT (pk_dish_id)
// DO
//    UPDATE SET dish_name = EXCLUDED.dish_name,
//    description = EXCLUDED.description,
//    price = EXCLUDED.price,
//    quantity_available= EXCLUDED.quantity_available;`
