const db = require('../../database/pg_model.js');

const userController = {};

userController.creatSeller = async (req, res, next) => {
  try {
    const props = [
      //pk_seller_id,      // do we need this one??
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
    for (let i = 0; i < props.length; i++) {
      values.push(req.body[props[i]]);
    }
    // console.log("values: ", values);
    const text = `INSERT INTO public.sellers (seller_email, password, seller_nickname, seller_bio, kitchen_name, pickup_window_start, pickup_window_end, seller_street_name, seller_street_number, seller_city, seller_zip_code) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10 $11) RETURNING *;`;
    const data = await db.query(text, values);
    res.locals.seller = data.rows[0];

    return next();
  } catch (error) {
    next({}); // how to use global error handler?
  }
};
