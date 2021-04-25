const knex = require("../database/knex");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const AWS = require('aws-sdk');
AWS.config.update({region: 'eu-west-1'});
const sqs = new AWS.SQS({apiVersion: '2012-11-05'});

module.exports = {
  async index(req, res, next) {
    try {
      const connectDB = await knex.connect();
      const allUsersFromDB = await connectDB("users");

      return res.status(200).json(allUsersFromDB);

    } catch (error) {
        next(error);
    }
  },

  async view(req, res, next) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: "Missing User ID" });
      }

      const connectDB = await knex.connect();
      const userFromDB = await connectDB("users").where({ id: id }).first();

      if (!userFromDB) return res.status(400).json({ message: "No User Found with this ID" });

      return res.status(200).json({ user: userFromDB });

    } catch (error) {
        next(error);
    }
  },

  async create(req, res, next) {
    try {
      const { 
        isHairdresser,
        firstName, 
        lastName, 
        dob, 
        mobile, 
        email, 
        password,
        hairdresserSince, 
        addressLine1,
        addressLine2,
        city,
        county,
        country, 
        homeService,
     } = req.body;

      if (!firstName || !lastName || !dob || !mobile || !email || !password ) {
        return res.status(400).json({ message: "Missing Required Information from Request" });
      }

      const connectDB = await knex.connect();
      const userFromDB = await connectDB("users").where({ email: email }).first();

      if(userFromDB) return res.status(400).json({ message: "Email address already registered. Please try again using a different email address" });

      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      const verificationToken = crypto.randomBytes(20).toString("hex");

      const newUser = await connectDB('users').insert({
        first_name: firstName, 
        last_name: lastName, 
        dob: dob, 
        mobile: mobile, 
        email: email.toLowerCase(), 
        password: hashedPassword, 
        addressLine1: addressLine1,
        addressLine2: addressLine2, 
        city: city, 
        county: county, 
        country: country,  
        home_service: homeService,
        profile_img_url: "",
        hairdresser_since: hairdresserSince,
        verification_token: verificationToken, 
        is_hairdresser: isHairdresser,
      });

      /*
      const SQSParams = {
        MessageAttributes: {
          "firstName": {
            DataType: "String",
            StringValue: firstName
          },
          "email": {
            DataType: "String",
            StringValue: email.toLowerCase()
          },
          "verificationToken": {
            DataType: "String",
            StringValue: verificationToken
          },
        },
        MessageBody: "Information required to submit Verification Email",
        MessageDeduplicationId: verificationToken,  // Required for FIFO queues
        MessageGroupId: "Group1",  // Required for FIFO queues
        QueueUrl: "https://sqs.eu-west-1.amazonaws.com/128363080680/RESTaurant-SendEmailVerification.fifo"
      }

      sqs.sendMessage(SQSParams, function(err, data){
        if (err) {
          console.log("Error", err);
          return res.status(500).json({ err });
        } else {
          console.log("Success", data.MessageId);
        }
      })
      */

      return res.status(201).json({ message: "User Created Successfully", newUserID: newUser });

    } catch (error) {
        next(error);
    }
  },

  async update(req, res, next) {
    try {
      const { 
        id,
        firstName, 
        lastName, 
        mobile, 
        hairdresserSince, 
        addressLine1,
        addressLine2,
        city,
        county,
        country, 
        homeService,
        profile_img_url,
      } = req.body;

      if ( !firstName || !lastName || !mobile ) {
        return res.status(400).json({ message: "Missing Required Information from Request" });
      }

      const connectDB = await knex.connect();
      const userFromDB = await connectDB("users").where({ id: id }).first();

      if(!userFromDB) return res.status(400).json({ message: "No User Found with this ID" });

      const updatedUser = await connectDB('users').where({ id: id }).update({
        first_name: firstName, 
        last_name: lastName,  
        mobile: mobile,
        addressLine1: addressLine1,
        addressLine2: addressLine2, 
        city: city, 
        county: county, 
        country: country, 
        address: address, 
        home_service: homeService,
        profile_img_url: profile_img_url,
        hairdresser_since: hairdresserSince,
      });

      return res.status(200).json({ message: 'User updated successfully'});

    } catch (error) {
        next(error);
    }
  },

  async delete(req, res, next) {
    try {

      const { id } = req.body;

      if (!id) {
        return res.status(400).json({ message: "Missing Required Information from Request" });
      }

      const connectDB = await knex.connect();
      const userFromDB = await connectDB("users").where({ id: id }).first();

      if(!userFromDB) return res.status(400).json({ message: "No User Found with this ID" });

      const deletedUser = await connectDB('users').where({ id: id}).del();

      return res.status(200).json({ message: 'User deleted successfully' });

    } catch (error) {
        next(error);
    }
  },

  async verifyEmailAddress(req, res, next) {
    try {

      const { verificationToken } = req.params;

      if (!verificationToken) {
        return res.status(400).json({ message: "Missing Required Information from Request" });
      }

      const connectDB = await knex.connect();
      const userFromDB = await connectDB("users").where({ verification_token: verificationToken }).first();

      if(!userFromDB) return res.status(400).json({ message: "No User found with this verification token" });

      const verifiedUser = await connectDB('users').where({ verification_token: verificationToken }).update({
        verified: 1
      });

      return res.status(200).json({ message: 'User email address verified successfully.' });

    } catch (error) {
        next(error);
    }
  },

  async sendVerificationEmail(req, res, next) {
    try {

      const { firstName, email } = req.body;

      if (!firstName || !email) {
        return res.status(400).json({ message: "Missing Required Information from Request" });
      }

      const connectDB = await knex.connect();
      const userFromDB = await connectDB("users").where({ email: email }).first();

      if(!userFromDB) return res.status(400).json({ message: "No User found with this email" });

      const SQSParams = {
        MessageAttributes: {
          "firstName": {
            DataType: "String",
            StringValue: firstName
          },
          "email": {
            DataType: "String",
            StringValue: email.toLowerCase()
          },
          "verificationToken": {
            DataType: "String",
            StringValue: userFromDB.verification_token
          },
        },
        MessageBody: "Information required to submit Verification Email",
        MessageDeduplicationId: userFromDB.verification_token,  // Required for FIFO queues
        MessageGroupId: "Group1",  // Required for FIFO queues
        QueueUrl: "https://sqs.eu-west-1.amazonaws.com/128363080680/RESTaurant-SendEmailVerification.fifo"
      }

      sqs.sendMessage(SQSParams, function(err, data){
        if (err) {
          console.log("Error", err);
          return res.status(500).json({ err });
        } else {
          console.log("Success", data.MessageId);
        }
      })

      return res.status(200).json({ message: 'Verification Email Added to SQS queue successfully.' });

    } catch (error) {
        next(error);
    }
  },
};
