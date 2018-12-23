//const jwt = require("jsonwebtoken");
const config = require("../config/config");

module.exports = function(req, res, next) {
  // const token = req.header("x-auth-token");
  // if (!token) return res.status(401).send("Access denied. No token provided.");

  // try {
  //   const decoded = jwt.verify(token, config.jwtToken);
  //   const loginValidDate = new Date(decoded.validUntil);

  //   if (new Date() > loginValidDate)
  //     return res.status(401).send("Access denied. Expired token.");

  //   req.user = decoded;
  //   next();
  // } catch (ex) {
  //   res.status(400).send("Invalid token.");
  // }

  next();
};
