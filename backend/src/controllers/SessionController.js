const knex = require("../database/knex");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AWSSecretsManager = require("../../AWSSecretsManager");

module.exports = {
  async create(req, res, next) {
    try {
      const connectDB = await knex.connect();

      const jwtSecret = await AWSSecretsManager.getCredentials('myhairdone-jwt-token-secret');

      const { email, password } = req.body;

      if (!email || !password) return res.status(400).json({message: "Missing Required Information from Request. Please try again." });

      const userFromDB = await connectDB("users").where({ email: email.toLowerCase() }).first();
      
      if (!userFromDB) return res.status(400).json({ message: "No registered user found with this email address. Please try again." });

      console.log(userFromDB)
      console.log(await bcrypt.compare(password, userFromDB.password))

      //if (userFromDB.verified == false) return res.status(400).json({ message: "Please verify your email before logging in" });

      //JWT Auth is built here - After checking the user credentials (authentication)
      if (!await bcrypt.compare(password, userFromDB.password)) return res.status(400).json({ message: "Password is incorrect. Please try again." });
        
      const accessToken = jwt.sign(userFromDB.email, jwtSecret.secret);

      return res.status(200).json({
        message: "User Logged in successfully",
        id: userFromDB.id,
        accessToken: accessToken,
        isAdmin: userFromDB.is_admin
      });
    
    } catch (error) {
        next(error);
    }
  },

};