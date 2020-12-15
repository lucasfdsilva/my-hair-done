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
      const userFromDB = await connectDB("users").where({ user_id: id }).first();

      console.log(userFromDB);

      if (!userFromDB) return res.status(400).json({ message: "No User Found" });

      return res.status(200).json({ user: userFromDB });

    } catch (error) {
        next(error);
    }
  },

  async create(req, res, next) {
    try {
      const { firstName, lastName, dob, mobile, email, password, isAdmin, profile_img_url } = req.body;

      if (!firstName || !lastName || !dob || !mobile || !email || !password) {
        return res.status(400).json({ message: "Missing Required Information from Request" });
      }

      const connectDB = await knex.connect();
      const userFromDB = await connectDB("users").where({ email: email }).first();

      if(userFromDB) return res.status(400).json({ message: "Email address already registered" });

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
        is_admin: isAdmin,
        profile_img_url: profile_img_url,
        verification_token: verificationToken,
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
      const { id, firstName, lastName, dob, mobile, email, isAdmin, profile_img_url, active_bookings, past_haircuts } = req.body;

      if (!id || !firstName || !lastName || !dob || !mobile || !email ) {
        return res.status(400).json({ message: "Missing Required Information from Request" });
      }

      const connectDB = await knex.connect();
      const userFromDB = await connectDB("users").where({ user_id: id }).first();

      if(!userFromDB) return res.status(400).json({ message: "No User Found" });

      const updatedUser = await connectDB('users').where({ user_id: id }).update({
        first_name: firstName,
        last_name: lastName,
        email: email.toLowerCase(),
        is_admin: isAdmin,
        profile_img_url: profile_img_url,
        active_bookings: active_bookings,
        past_haircuts: past_haircuts
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
      const userFromDB = await connectDB("users").where({ user_id: id }).first();

      if(!userFromDB) return res.status(400).json({ message: "No User Found" });

      const deletedUser = await connectDB('users').where({ user_id: id}).del();

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

      if(!userFromDB) return res.status(400).json({ message: "No User Found with this verification token" });

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

      console.log(userFromDB);

      if(!userFromDB) return res.status(400).json({ message: "No User Found with this email" });

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
