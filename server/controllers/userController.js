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
    //res.locals.seller = data.rows[0];

    return next();
  } catch (error) {
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
    //res.locals.buyer = data.rows[0];

    return next();
  } catch (error) {
    console.log(error)
    return next(error); // how to use global error handler?
  }

};

userController.login = async (req, res, next) => {
  // Destructuring the username and password
  const { username, password, userType } = req.body
  try {
  // Loop over the username to check if it has an "@". If "@" exists then an email has been sent
  let userLoginType = 'nickname';
  for (let i = 0; i<username.length; i++) {
    if(username[i] === '@') {
      userLoginType = 'email'
      break;
    } else {
      continue;
    }
  }
  const userInfo = [username]
  // If an email has been sent then we need to search the table using the email column
  if (userLoginType === 'email') {
    // checking if the user is a seller or buyer to alter the query
    let sqlQueryUsername;
    if (userType === 'seller') {
    sqlQueryUsername = `select * from public.sellers where seller_email = $1`
    } else {
    sqlQueryUsername = `select * from public.buyers where buyer_email = $1`
    } 
  } else { // If the nickname was sent instead of an email 
    if (userType === 'seller') {
      sqlQueryUsername = `select * from public.sellers where seller_nickname = $1`
      } else {
      sqlQueryUsername = `select * from public.buyers where buyer_nickname = $1`
      } 
  }
    const data = await db.query(sqlQueryUsername, userInfo)
    // Checks if data has been found or not
    if (data.rows[0] === undefined) return res.send('Username/Email does not exist')
    // If the username/emaiil has been found, it checks if the password matches
    if (await bcrypt.compare(password, data.rows[0].password)) {
      return next()
    } else {
      return res.send('Password is incorrect')
    } 
  } catch (error) {
  return next(error)
  }
}
module.exports = userController;