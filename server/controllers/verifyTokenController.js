const jwt = require('jsonwebtoken');

//my approach:
/*
const tokenVerifier = (req, res, next) => {
  const bearerHeader = req.headers['authorization'];
  if (bearerHeader) {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    //res.token = bearerToken;
    jwt.verify(bearerToken, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
      if (err) {
        console.log('err==>', err);
        //res.status(403).send('Invalid Token');

        return next({ status: 403, message: { error: err.message } });
      } else {
        return next();
      }
    });
  }
};
*/

const tokenVerifier2 = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.sendStatus(403);
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
    if (err) {
      return res.status(403).send('Invalid Token');
    } else {
      return next();
    }
  });
};

module.exports = tokenVerifier2;
