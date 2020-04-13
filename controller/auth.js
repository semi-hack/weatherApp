const jwt = require("jsonwebtoken");

module.exports = async function(req, res, next) {
  const token = req.header('token')
  if (!token) return res.status(401).json({ message: "Auth Error" });

  try {
    const data = jwt.verify(token, process.env.JWTSECRET);
    req.user = data
    next();
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: "Invalid Token" });
  }
};