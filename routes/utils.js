const jwt = require("jsonwebtoken");
const { getUser } = require("../db/models/users");

const authRequired = async (req, res, next) => {
  const token = req.signedCookies.token;
  console.log("signed cookies: ", req.signedCookies);
  console.log("Token from auth required: ", token);
  try {
    if (!token) {
      throw new Error("No token provided.");
    }

    const user = await jwt.verify(token, process.env.JWT_SECRET);
    delete user.password;
    console.log("USER", user);
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      loggedIn: false,
      message: "You are not authorized.",
    });
  }
};

module.exports = { authRequired };
