const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = "jwt-secret-key";

const verifyToken = async (req, res, next) => {
  // console.log("verify Token");
  try {
    let token = req.headers.authorization;
    // token = token.split(" ")[1];
    if (!token) return res.json({ message: "Illegal Access!", status: "fail" });
    jwt.verify(token, JWT_SECRET_KEY, (err, user) => {
      if (err) return res.json({ message: "Illegal Access!", status: "fail" });
      else {
        console.log("user ", user);
        req.userId = user.id;
        next();
      }
    });
  } catch (err) {
    if (err) console.log(err);
  }
};
module.exports = { verifyToken };
