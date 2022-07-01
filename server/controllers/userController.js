const db = require('../../database/pg_model.js');
const bcrypt = require('bcrypt');
const userController = {};

userController.createSeller = async (req, res, next) => {
  // Checking the usertype to decide which controller it has to pass through (createSeller vs createBuyer)
  if (req.body.userType === 'buyer') return next()
  try {
    const props = [
      'seller_email',
      'password',
      'seller_nickname',
      'seller_bio',
      'kitchen_name',
      'pickup_window_start',
      'pickup_window_end',
      'seller_street_name',
      'seller_street_number',
      'seller_city',
      'seller_zip_code',
    ];
    const values = [];
    // storing the values of the above keys which are received in the body of the request in the values array
    for (let i = 0; i < props.length; i++) {
      values.push(req.body[props[i]]);
    }
    //Hashing the password
    const hashedPassword = await bcrypt.hash(values[1], 10)
    //Change the password to the hashed password in the values array
    values[1] = hashedPassword
    // console.log("values: ", values);
    const sqlQuery = `INSERT INTO public.sellers 
    (seller_email, password, seller_nickname, seller_bio, kitchen_name, pickup_window_start, pickup_window_end, seller_street_name, seller_street_number, seller_city, seller_zip_code) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) 
    RETURNING *;`;
    const data = await db.query(sqlQuery, values);
    res.locals.seller = data.rows[0];

    return next();
  } catch (error) {
    console.log(error)
    return next(error); // how to use global error handler?
  }
};

userController.createBuyer = async (req, res, next) => {
  if (req.body.userType === 'seller') return next()
  try {
    const props = [
      'buyer_email',
      'password',
      'buyer_nickname',
      'buyer_street_name',
      'buyer_street_number',
      'buyer_zip_code',
      'buyer_city',
    ];
    const values = [];
    // storing the values of the above keys which are received in the body of the request in the values array
    for (let i = 0; i < props.length; i++) {
      values.push(req.body[props[i]]);
    }
    //Hashing the password
    const hashedPassword = await bcrypt.hash(values[1], 10)
    //Change the password to the hashed password in the values array
    values[1] = hashedPassword
    // console.log("values: ", values);
    const sqlQuery = `INSERT INTO public.buyers 
    (buyer_email, password, buyer_nickname, buyer_street_name, buyer_street_number, buyer_zip_code, buyer_city)
    VALUES ($1, $2, $3, $4, $5, $6, $7) 
    RETURNING *;`;
    const data = await db.query(sqlQuery, values);
    res.locals.buyer = data.rows[0];

    return next();
  } catch (error) {
    console.log(error)
    return next(error); // how to use global error handler?
  }
};

module.exports = userController;