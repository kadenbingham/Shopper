const authRouter = require("express").Router();

authRouter.post("/register", async (req, res, next) => {
  try {
    // get the username and password from the req.body
    // query our db to see if a user with that username exists
    // if a user already exists, send and error
    // if the username isn't taken
    // create a new user in the DB
    // use that user from the db to sign a JWT token
    // send that token back to the user in a HTTP ONLY 🍪
  } catch (error) {
    next(error);
  }
});

authRouter.post("/login", async (req, res, next) => {
  try {
    // get the username and password from the req.body
    // query our db to see if a user with that username exists
    // if a user exists, check that password against the DB user password
    // if the passwords match,
    // user user from the db to sign a JWT token
    // send that token back to the user in a HTTP ONLY 🍪
  } catch (error) {
    next(error);
  }
});

authRouter.get("/me", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

authRouter.get("/logout", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

module.exports = authRouter;
