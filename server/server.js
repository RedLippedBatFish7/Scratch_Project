require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const userController = require('./controllers/userController');
const tokenVerifier2 = require('./controllers/verifyTokenController');
const stripeController = require('./controllers/stripeController');
const menuController = require('./controllers/menuController');

const app = express();
const PORT = 3000;

// Importing Router

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

app.post('/checkout', stripeController, (req, res) => {
  res.status(200).json({ url: res.locals.session.url });
});

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
  jwt.sign(
    { userdata: res.locals.data },
    process.env.ACCESS_TOKEN_SECRET,
    (err, token) => {
      res.cookie('token', token, { httpOnly: true });
      res.status(200).json(res.locals.data);
    }
  );
});

app.get(
  '/feed',
  tokenVerifier2,
  userController.sellerInformation,
  (req, res) => {
    res.status(200).json(res.locals.data);
  }
);

app.post(
  '/auth/zipcode',
  tokenVerifier2,
  userController.userZip,
  (req, res) => {
    res.json('Successfully added zipcode');
  }
);

app.post(
  '/db/getmenu',
  tokenVerifier2,
  menuController.getSellerMenu,
  (req, res) => {
    console.log('res.locals.sellerMenu==>', res.locals.sellerMenu);
    //adding tokenVerifier2 as the 2nd middleware?
    res.status(200).json(res.locals.sellerMenu);
  }
);

// app.post('/db/menu', tokenVerifier2, menuController.createDish, (req, res) => {
//   //adding tokenVerifier2 as the 2nd middleware?
//   res.status(200).json(res.locals.dish);
// });

app.post('/db/updatemenu', menuController.updateMenu, (req, res) => {
  //console.log('res.locals.sellerMenu==>', res.locals.sellerMenu);
  res.status(200).json(res.locals.message);
});
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
  const defaultErr = {
    status: 400,
    message: { error: 'An error occurred' },
  };
  const errorObj = Object.assign(defaultErr, err);
  console.log('errorObj ==>', errorObj);
  return res.status(errorObj.status).json(errorObj.message);
});

/**
 * start server
 */
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;
