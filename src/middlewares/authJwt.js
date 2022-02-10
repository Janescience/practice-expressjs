const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {

    let headerToken = !req.headers["authorization"] ? req.body.headers["authorization"] : req.headers["authorization"];
    if (!headerToken) {
      return res.status(403).send({ message: "No token provided!" });
    }

    let token = headerToken.split(" ")[1];
    if(!token){
      return res.status(403).send({ message: "No token provided!" });
    }
  
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Unauthorized!" });
      }
      req.userId = decoded._id;
      next();
    });

};

const authJwt = {
    verifyToken
};

module.exports = authJwt;