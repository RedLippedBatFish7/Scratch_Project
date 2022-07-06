const jwt = require('jsonwebtoken');

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

module.exports = tokenVerifier;
