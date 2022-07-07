const jwt = require('jsonwebtoken');

// const tokenVerifier = (req, res, next) => {
//     const bearerHeader = req.headers['authorization']
//     if(typeof bearerHeader !== 'undefined') {
//       const bearer = bearerHeader.split(' ')
//       const bearerToken = bearer[1]
//       req.token = bearerToken
//       next()
//     } else {
//       res.sendStatus(403)
//     }
//   }


const tokenVerifier2 = (req, res, next) => {
    const token = req.cookies.token
    if(!token) {
        return res.sendStatus(403)
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
        if(err) {
          return res.status(403).send('Invalid Token')
        } else {
          return next()
        }
    })
  }

  module.exports = tokenVerifier2;