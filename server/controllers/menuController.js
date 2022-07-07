const db = require('../../database/pg_model.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();

/*
Receive a get req from:
db/menu
and a body of:
{userId}
Return an object containing:
{ kitchenName, dishes: {...} }  //using Array instead? 
with each key:value pair of dishes looking like:
{ dishId: { name, description, price, quantity } }
*/

const menuController = {};

menuController.createDish = async (req, res, next) => {
  // Checking the usertype to decide which controller it has to pass through (createSeller vs createBuyer)

  try {
    const props = ['sellerId', 'dish_name', 'description', 'price', 'quantity_available'];
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
  const { userId } = req.body;
  const para = [userId];

  //will be an inner join table
  //templete
  /*
  const text = 'SELECT species.*, planets.name AS homeworld FROM species LEFT OUTER JOIN planets ON species.homeworld_id = planets._id WHERE species._id = $1';
  const text = `SELECT people.*, species.name AS species, planets.name AS homeworld
   FROM people LEFT OUTER JOIN species ON people.species_id = species._id LEFT OUTER JOIN planets ON people.homeworld_id = planets._id;`;
  const text2 = `SELECT f.title, f._id AS id FROM films f INNER JOIN people_in_films pif ON f._id=pif.film_id WHERE pif.person_id=$1;`;
  */
  const sqlQuery = `select d.pk_dish_id, d.fk_seller_id, d.dish_name, d.description, d.price, d.quantity_available,s.kitchen_name
  FROM public.dishes d INNER JOIN public.sellers s ON d.fk_seller_id=s.pk_seller_id WHERE d.fk_seller_id = $1;`;
  try {
    data = await db.query(sqlQuery, para);
    //console.log(data.rows);
    const kitchenMenu = {};
    kitchenMenu.kitchenName = data.rows[0].kitchen_name;
    kitchenMenu.dishes = {};

    data.rows.forEach(dishObj => {
      const dishId = dishObj['pk_dish_id'];
      const dish = {};
      dish.name = dishObj.dish_name;
      dish.description = dishObj.description;
      dish.price = dishObj.price;
      dish.quantity = dishObj.quantity_available;
      //console.log("dish==>", dish)
      kitchenMenu.dishes[dishId] = dish;
    });

    console.log('kitchenMenu==>', kitchenMenu);

    res.locals.sellerMenu = kitchenMenu;
    return next();
  } catch (error) {
    return next({ message: error.detail });
  }
};

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

---

Consider using the following structure so you don't need separate commands for insert and update:
```INSERT INTO customers (name, email)
VALUES('Microsoft','hotline@microsoft.com') 
ON CONFLICT (name) 
DO 
   UPDATE SET email = 'updated@email.com';```
https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-upsert/
*/

menuController.updateMenu = async (req, res, next) => {
  const userId = req.cookies.userId;
  const para = [userId];
  const { menuChanges } = req.body;
  try {
    for (let dishId in menuChanges) {
      //{name, description, price, quantity
      if (Object.keys(menuChanges[dishId]).length === 0) {
        const sqlQuery = `DELETE FROM public.dishes
      WHERE pk_dish_id=${dishId};`;
      }
    }
  } catch (e) {
    console.log(e); // need to use globa error hander later
  }
};

module.exports = menuController;
