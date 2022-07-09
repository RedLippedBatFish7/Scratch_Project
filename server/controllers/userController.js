const db = require('../../database/pg_model.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userController = {};
require('dotenv').config();

userController.createSeller = async (req, res, next) => {
  // Checking the usertype to decide which controller it has to pass through (createSeller vs createBuyer)
  if (req.body.userType === 'buyer') return next();
  try {
    const props = ['seller_email', 'password', 'seller_nickname'];
    const values = [];
    // storing the values of the above keys which are received in the body of the request in the values array
    for (let i = 0; i < props.length; i++) {
      values.push(req.body[props[i]]);
    }
    //Hashing the password
    const hashedPassword = await bcrypt.hash(values[1], 10);
    //Change the password to the hashed password in the values array
    values[1] = hashedPassword;
    // console.log("values: ", values);
    const sqlQuery = `INSERT INTO public.sellers 
    (seller_email, password, seller_nickname, market_enabled) 
    VALUES ($1, $2, $3, NULL) 
    RETURNING *;`;
    const data = await db.query(sqlQuery, values);
    //res.locals.seller = data.rows[0];

    return next();
  } catch (error) {
    console.log(error.detail);
    return next({ message: error.detail });
  }
};

userController.createBuyer = async (req, res, next) => {
  if (req.body.userType === 'seller') return next();
  try {
    const props = ['buyer_email', 'password', 'buyer_nickname'];
    const values = [];
    // storing the values of the above keys which are received in the body of the request in the values array
    for (let i = 0; i < props.length; i++) {
      values.push(req.body[props[i]]);
    }
    //Hashing the password
    const hashedPassword = await bcrypt.hash(values[1], 10);
    //Change the password to the hashed password in the values array
    values[1] = hashedPassword;
    // console.log("values: ", values);
    const sqlQuery = `INSERT INTO public.buyers 
    (buyer_email, password, buyer_nickname)
    VALUES ($1, $2, $3) 
    RETURNING *;`;
    const data = await db.query(sqlQuery, values);
    //res.locals.buyer = data.rows[0];

    return next();
  } catch (error) {
    return next({ message: error.detail }); // how to use global error handler?
  }
};

userController.login = async (req, res, next) => {
  // Destructuring the username and password
  const { username, password, userType } = req.body;
  try {
    // If "@" exists then an email has been sent
    let userLoginType = 'nickname';
    if (username.includes('@')) userLoginType = 'email';

    const userInfo = [username];
    let sqlQueryUsername;
    const type = userType === 'seller' ? 'seller' : 'buyer';
    // If an email has been sent then we need to search the table using the email column
    if (userLoginType === 'email') {
      // checking if the user is a seller or buyer to alter the query
      if (userType === 'seller') {
        sqlQueryUsername = `select * from public.sellers where seller_email = $1`;
      } else {
        sqlQueryUsername = `select * from public.buyers where buyer_email = $1`;
      }
    } else {
      // If the nickname was sent instead of an email
      if (userType === 'seller') {
        sqlQueryUsername = `select * from public.sellers where seller_nickname = $1`;
      } else {
        sqlQueryUsername = `select * from public.buyers where buyer_nickname = $1`;
      }
    }
    const data = await db.query(sqlQueryUsername, userInfo);
    console.log(data.rows[0]);
    // Checks if data has been found or not
    if (data.rows[0] === undefined)
      return res.send('Username/Email does not exist');
    // If the username/emaiil has been found, it checks if the password matches
    if (await bcrypt.compare(password, data.rows[0].password)) {
      const zip = `${type}_zip_code`;
      const userId = `pk_${type}_id`;
      res.locals.data = {
        user_id: data.rows[0][userId],
        zip: data.rows[0][zip],
      };
      return next();
    } else {
      return res.send('Password is incorrect');
    }
  } catch (error) {
    return next(error);
  }
};

// Used to send back seller information to the front end
userController.sellerInformation = async (req, res, next) => {
  try {
    const sqlQuery = `select pk_seller_id, kitchen_name, seller_street_name, seller_street_number, seller_city, seller_zip_code, seller_bio, cuisine, pickup_window_start, pickup_window_end, market_enabled
   from public.sellers`;
    data = await db.query(sqlQuery);
    console.log(data.rows);
    const mappedData = {};
    for (let el of data.rows) {
      console.log(el, 'booooooooooooooooooooo');
      const {
        pk_seller_id,
        kitchen_name,
        seller_street_name,
        seller_street_number,
        seller_city,
        seller_zip_code,
        seller_bio,
        cuisine,
        pickup_window_start,
        pickup_window_end,
        market_enabled,
      } = el;
      mappedData[pk_seller_id] = {
        kitchen_name,
        seller_street_name,
        seller_street_number,
        seller_city,
        seller_zip_code,
        seller_bio,
        cuisine,
        pickup_window_start,
        pickup_window_end,
        market_enabled,
      };
    }

    res.locals.data = mappedData;
    return next();
  } catch (error) {
    return next({ message: error.detail });
  }
};

userController.userZip = async (req, res, next) => {
  // destructuring the request body

  const userId = req.cookies.userId;
  const userType = req.cookies.userType;
  const { zipcode } = req.body;
  details = [zipcode, userId];


  try {
    //updating the zipcode using the user id
    const sqlZipQuery = `update ${userType}s 
      set ${userType}_zip_code = $1 
      where pk_${userType}_id = $2`;
    const data = await db.query(sqlZipQuery, details);
    return next();
  } catch (error) {
    return next({ message: error.detail });
  }
};

module.exports = userController;
