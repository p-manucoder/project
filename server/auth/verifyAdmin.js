const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = "jwt-secret-key";

const verifyAdmin = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token) return res.json({ message: "Illegal Access!", status: "fail" });
    jwt.verify(token, JWT_SECRET_KEY, (err, user) => {
      console.log(user);
      if (user.role == "admin") return next();
      return res.json({ message: "Illegal Access!", status: "fail" });
    });
  } catch (err) {
    if (err) console.log(err);
  }
};
module.exports = { verifyAdmin };
