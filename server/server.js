require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userController = require('./controllers/userController');



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

app.post('/auth/signup', userController.createSeller, userController.createBuyer, (req, res) => {
  if(req.body.userType === 'seller') {
    res.status(200).send('You have signed up as a seller')
  } else {
    res.status(200).send('You have signed up as a buyer')
  }
})

app.post('/auth/login', userController.login, (req, res) => {
  res.status(200).send('Welcome')
})

app.get('/feed', userController.sellerInformation, (req, res) => {
  res.status(200).send('User Information')
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
    log: "Express error handler caught unknown middleware error",
    status: 400,
    message: { err: "An error occurred" },
  };
  let errorObj = Object.assign(defaultErr, { message: { err: err.message } });
  console.log(errorObj)
  res.status(errorObj.status).json(errorObj);
});


/**
 * start server
 */
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;
