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
      const allHairdressersFromDB = await connectDB("hairdressers");

      return res.status(200).json(allHairdressersFromDB);

    } catch (error) {
        next(error);
    }
  },

  async view(req, res, next) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: "Missing Hairdresser ID" });
      }

      const connectDB = await knex.connect();
      const hairdresserFromDB = await connectDB("hairdressers").where({ hairdresser_id: id }).first();

      console.log(hairdresserFromDB);

      if (!hairdresserFromDB) return res.status(400).json({ message: "No Hairdresser Found" });

      return res.status(200).json({ hairdresser: hairdresserFromDB });

    } catch (error) {
        next(error);
    }
  },

  async create(req, res, next) {
    try {
      const { 
        firstName, 
        lastName, 
        dob, 
        mobile, 
        email, 
        password, 
        address, 
        home_service,
        profile_img_url,
        style_expertise, 
        hairdresser_since,
     } = req.body;

      if (!firstName || !lastName || !dob || !mobile || !email || !password || !address || !home_service || !style_expertise || !hairdresser_since ) {
        return res.status(400).json({ message: "Missing Required Information from Request" });
      }

      const connectDB = await knex.connect();
      const hairdresserFromDB = await connectDB("hairdressers").where({ email: email }).first();

      if(hairdresserFromDB) return res.status(400).json({ message: "Email address already registered" });

      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      const verificationToken = crypto.randomBytes(20).toString("hex");

      const newHairdresser = await connectDB('hairdressers').insert({
        first_name: firstName, 
        last_name: lastName, 
        dob: dob, 
        mobile: mobile, 
        email: email.toLowerCase(), 
        password: hashedPassword, 
        address: address, 
        home_service: home_service,
        profile_img_url: profile_img_url,
        style_expertise: style_expertise, 
        hairdresser_since: hairdresser_since,
        verification_token: verificationToken   
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

      return res.status(201).json({ message: "Hairdresser Created Successfully", newHairdresserID: newHairdresser });

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
        dob, 
        mobile, 
        email, 
        password, 
        address, 
        home_service,
        profile_img_url,
        style_expertise, 
        hairdresser_since, } = req.body;

      if ( !firstName || !lastName || !dob || !mobile || !email || !password || !address || !home_service || !style_expertise || !hairdresser_since ) {
        return res.status(400).json({ message: "Missing Required Information from Request" });
      }

      const connectDB = await knex.connect();
      const hairdresserFromDB = await connectDB("hairdressers").where({ hairdresser_id: id }).first();

      if(!hairdresserFromDB) return res.status(400).json({ message: "No Hairdresser Found" });

      const updatedHairdresser = await connectDB('hairdressers').where({ hairdresser_id: id }).update({
        first_name: firstName, 
        last_name: lastName, 
        dob: dob, 
        mobile: mobile, 
        email: email.toLowerCase(), 
        address: address, 
        home_service: home_service,
        profile_img_url: profile_img_url,
        style_expertise: style_expertise, 
        hairdresser_since: hairdresser_since,
      });

      return res.status(200).json({ message: 'Hairdresser updated successfully'});

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
      const hairdresserFromDB = await connectDB("hairdressers").where({ hairdresser_id: id }).first();

      if(!hairdresserFromDB) return res.status(400).json({ message: "No Hairdresser Found" });

      const deletedHairdresser = await connectDB('hairdressers').where({ hairdresser_id: id}).del();

      return res.status(200).json({ message: 'Hairdresser deleted successfully' });

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
      const hairdresserFromDB = await connectDB("hairdressers").where({ verification_token: verificationToken }).first();

      if(!hairdresserFromDB) return res.status(400).json({ message: "No Hairdresser found with this verification token" });

      const verifiedHairdresser = await connectDB('hairdressers').where({ verification_token: verificationToken }).update({
        verified: 1
      });

      return res.status(200).json({ message: 'Hairdresser email address verified successfully.' });

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
      const hairdresserFromDB = await connectDB("hairdressers").where({ email: email }).first();

      console.log(hairdresserFromDB);

      if(!hairdresserFromDB) return res.status(400).json({ message: "No Hairdresser found with this email" });

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
            StringValue: hairdresserFromDB.verification_token
          },
        },
        MessageBody: "Information required to submit Verification Email",
        MessageDeduplicationId: hairdresserFromDB.verification_token,  // Required for FIFO queues
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
