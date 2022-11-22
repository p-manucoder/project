const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const { json } = require("body-parser");
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = "jwt-secret-key";
const signUpController = async (req, res, next) => {
  // console.log("hi");
  try {
    const { firstName, lastName, mobileNumber, email, password, address } =
      req.body;
    let name = firstName + " " + lastName;
    let existingUser = await User.findOne({ email });
    if (existingUser)
      return res.json({
        message: "Email/User Already Exists! Please Login .",
        status: "fail",
      });
    const hashedPassword = bcrypt.hashSync(password);
    const user = await new User({
      name,
      mobileNumber,
      email,
      password: hashedPassword,
      address,
    });
    await user.save();
    user.password = undefined;
    const token = jwt.sign({ id: user._id }, JWT_SECRET_KEY);

    return res.json({
      message: "Signup Successful",
      status: "success",
      user: user,
      token,
    });
  } catch (err) {
    if (err)
      res.json({
        message: "Pls Fill All Fields Correctly!",
        status: "fail",
      });
  }
};
const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.json({
        message: "User Does not exist . Please Signup!",
        status: "fail",
      });
    const isPasswordCorrect = bcrypt.compareSync(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect)
      return res.json({
        message: "Email/Password Does not Match!",
        status: "fail",
      });

    existingUser.password = undefined;
    const token = jwt.sign({ id: existingUser._id }, JWT_SECRET_KEY);
    return res.json({
      message: "Login Successful",
      status: "success",
      user: existingUser,
      token,
    });
  } catch (err) {
    if (err) console.log(err);
  }
};

module.exports = { signUpController, loginController };
