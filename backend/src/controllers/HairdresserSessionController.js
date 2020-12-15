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

      if (!email || !password) return res.status(400).json({message: "Missing Required Information from Request" });

      const hairdresserFromDB = await connectDB("hairdressers").where({ email: email.toLowerCase() }).first();

      if (!hairdresserFromDB) return res.status(400).json({ message: "Hairdresser Not Found" });

      //if (userFromDB.verified == false) return res.status(400).json({ message: "Please verify your email before logging in" });

      //JWT Auth is built here - After checking the user credentials (authentication)
      if (!await bcrypt.compare(password, hairdresserFromDB.password)) return res.status(400).json({ message: "Password is incorrect" });
        
      const accessToken = jwt.sign(hairdresserFromDB.hairdresser_id, jwtSecret.secret);

      return res.status(200).json({
        message: "Hairdresser Logged in successfully",
        id: hairdresserFromDB.hairdresser_id,
        accessToken: accessToken,
        isAdmin: hairdresserFromDB.is_admin
      });
    
    } catch (error) {
        next(error);
    }
  },

};