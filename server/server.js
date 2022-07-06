require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const userController = require('./controllers/userController');
const tokenVerifier2 = require('./controllers/verifyTokenController');
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
const db = require('../database/pg_model.js');

const app = express();
const PORT = 3000;

// Importing Routers

// Handling requests
// needed this only because my proxy wasn't working bc webpack had an early bracket or something
// app.use(cors({ credentials: true, origin: 'http://localhost:8080' }));

app.use(express.json());
app.use(cookieParser());

// use for build COMMENT FOR DEV!! WILL DELIVER OLD BUILD
if (process.env.NODE_ENV !== 'development') {
  console.log('we are using production');
  app.use('/dist', express.static(path.join(__dirname, '../dist')));
  // use for build
  app.get('/', (req, res) => {
    console.log('picked up / only');
    // return res.sendStatus(200);
    return res
      .status(203)
      .sendFile(path.join(__dirname, '../client/index.html'));
  });
}

app.post('/checkout', async (req, res) => {
  const { dishId, quantity } = req.body
  dish_id = [dishId]
  sqlDishQuery = `select * from public.dishes where pk_dish_id = $1`
  try {
    dishData = await db.query(sqlDishQuery, dish_id)
    data = dishData.rows[0]
    console.log(data.price.slice(1)*100)
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [{
         price_data: {
          currency: "usd",
          product_data: {
            name: data.dish_name
          },
          unit_amount: Number(data.price.slice(1)*100)
        },
        quantity: quantity
      }],
      success_url: 'http://www.google.com',
      cancel_url: 'http://www.google.com',
    })
    res.status(200).json({ url: session.url })
  } catch (error) {
    console.log(error)
  }
})
 
app.post(
  '/auth/signup',
  userController.createSeller,
  userController.createBuyer,
  (req, res) => {
    if (req.body.userType === 'seller') {
      res.status(200).send('You have signed up as a seller');
    } else {
      res.status(200).send('You have signed up as a buyer');
    }
  }
);

app.post('/auth/login', userController.login, (req, res) => {
  jwt.sign({userdata: res.locals.data}, process.env.ACCESS_TOKEN_SECRET, (err, token)=>{
    res.cookie('token', token, { httpOnly: true })
    res.status(200).json(res.locals.data)
  })
})

app.get('/feed', tokenVerifier2, userController.sellerInformation, (req, res) => {
      res.status(200).json(res.locals.data)
})


// 404
app.use('*', (req, res) => {
  // console.log(Object.keys(req));
  console.log(req.url);
  console.log(req.originalUrl);
  console.log('this is 404');
  res.sendStatus(200);
});

// global err handler
// app.use(({ code, error }, req, res, next) => {
//   res.status(code).json({ error });
// });
app.use((err, req, res, next) => {
  let defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  let errorObj = Object.assign(defaultErr, { message: { err: err.message } });
  console.log(errorObj);
  res.status(errorObj.status).json(errorObj);
});

/**
 * start server
 */
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;
