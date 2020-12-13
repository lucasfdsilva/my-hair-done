const knex = require("../database/knex");
const { Consumer } = require('sqs-consumer');

const AWS = require('aws-sdk');
AWS.config.update({region: 'eu-west-1'});
const sqs = new AWS.SQS({apiVersion: '2012-11-05'});

module.exports = {
  async index(req, res, next) {
    try {
      const connectDB = await knex.connect();

      const { userID, hairdresserID } = req.query;

      let allBookings = [];

      if(!userID && !hairdresserID){
        allBookings = await connectDB("bookings");
        return res.status(200).json(allBookings);
      } else if(userID && !hairdresserID){
          allBookings = await connectDB("bookings").where({ user_id: userID });
          return res.status(200).json(allBookings);
      } else if(!userID && hairdresserID){
          allBookings = await connectDB("bookings").where({ hairdresser_id: hairdresserID });
          return res.status(200).json(allBookings);
      } else{
          return res.status(400).json({ message: "Missing Hairdresser ID" });
      }

    } catch (error) {
        next(error);
    }
  },

  async view(req, res, next) {
    try {
      const connectDB = await knex.connect();

      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: "Missing Booking ID" });
      }

      const bookingFromDB = await connectDB("bookings").where({ id: id }).first();

      if (!bookingFromDB) return res.status(400).json({ message: "No Booking Found" });

      return res.status(200).json({ booking : bookingFromDB });

    } catch (error) {
        next(error);
    }
  },

  async create(req, res, next) {
    try {
      const connectDB = await knex.connect();

      const { userID, userEmail, hairdresserID, slotID, date, startTime, duration } = req.body;

      if (!userID || !userEmail || !hairdresserID || !slotID || !date || !startTime || !duration) {
        return res.status(400).json({ message: "Missing Required Information from Request" });
      }

      const newBooking = await connectDB('bookings').insert({
        user_id: userID,
        hairdresser_id: hairdresserID,
        slot_id: slotID,
        date: date,
        start_time: startTime,
        duration: duration 
      });

      const SQSParams = {
        MessageAttributes: {
          "bookingID": {
            DataType: "String",
            StringValue: String(newBooking[0])
          },
          "userID": {
            DataType: "String",
            StringValue: String(userID)
          },
          "hairdresserID": {
            DataType: "String",
            StringValue: String(hairdresserID)
          },
          "userEmail": {
            DataType: "String",
            StringValue: userEmail
          },
          "date": {
            DataType: "String",
            StringValue: date
          },
          "startTime": {
            DataType: "String",
            StringValue: startTime
          },
          "duration": {
            DataType: "String",
            StringValue: String(duration)
          },
        },
        MessageBody: "New Booking Confirmation Email",
        MessageDeduplicationId: String(newBooking[0]),  // Required for FIFO queues
        MessageGroupId: "Group1",  // Required for FIFO queues
        QueueUrl: "https://sqs.eu-west-1.amazonaws.com/128363080680/RESTaurant-BookingConfirmationEmail.fifo"
      }

      sqs.sendMessage(SQSParams, function(err, data){
        if (err) {
          console.log("Error", err);
          return res.status(500).json({ err });
        } else {
          console.log("Success", data.MessageId);
        }
      })

      return res.status(201).json({ message: "Booking Registered Successfully" });

    } catch (error) {
        next(error);
    }
  },

  async update(req, res, next) {
    try {
      const connectDB = await knex.connect();

      const { id, userID, hairdresserID, slotID, date } = req.body;

      if (!id || !userID || !hairdresserID || !slotID || !date) {
        return res.status(400).json({ message: "Missing Required Information from Request" });
      }

      const bookingFromDB = await connectDB("bookings").where({ id: id }).first();

      if(!bookingFromDB) return res.status(400).json({ message: "No Booking Found" });

      const updatedBooking = await connectDB('bookings').where({ id: id }).update({
        user_id: userID,
        hairdresser_id: hairdresserID,
        slot_id: slotID,
        date: date
      });

      return res.status(200).json({ message: 'Booking updated successfully' });

    } catch (error) {
        next(error);
    }
  },

  async delete(req, res, next) {
    try {
      const connectDB = await knex.connect();
      
      const { id } = req.body;

      if (!id) {
        return res.status(400).json({ message: "Missing Required Information from Request" });
      }

      const bookingFromDB = await connectDB("bookings").where({ id: id }).first();

      if(!bookingFromDB) return res.status(400).json({ message: "No Booking Found" });

      const deletedBooking = await connectDB('bookings').where({ id: id}).del();

      return res.status(200).json({ message: 'Booking deleted successfully' });

    } catch (error) {
        next(error);
    }
  },

  async checkSlotsAvailability(req, res, next){
    try {
      const connectDB = await knex.connect();

      const { date } = req.query;
      var availableSlots = [];

      if (!date) {
        return res.status(400).json({ message: "Missing Required Information from Request" });
      }

      var convertedDate = new Date(date);
      var weekday = new Array(7);
      weekday[0] = "Sunday";
      weekday[1] = "Monday";
      weekday[2] = "Tuesday";
      weekday[3] = "Wednesday";
      weekday[4] = "Thursday";
      weekday[5] = "Friday";
      weekday[6] = "Saturday";
      var dateWeekDay = weekday[convertedDate.getDay()];
      
      const allRegisteredSlotsWeekDayTrueRaw = await connectDB.schema.raw(`SELECT id, start_time, duration from slots WHERE ${dateWeekDay} = true`);
      const existingBookingsOnDate = await connectDB("bookings").where({ date: date });

      //Get all slots that are registered for that week day
      var allRegisteredSlotsWeekDayTrueClean = [];
      for(const slot of allRegisteredSlotsWeekDayTrueRaw[0]){
        allRegisteredSlotsWeekDayTrueClean.push({ "slot_id": slot.id, "start_time": slot.start_time, "duration": slot.duration });
      }

      //Get all slots that already have bookings on that day
      var availableSlots = [];
      for(const booking of existingBookingsOnDate){
        var slotAlreadyInArray=false
        
        //If there's already a booking for that slot, it's flags so that same slot is not added to the availableSlots array
        for(const slot of slotsInBookingsOnDate){
          if(slot.slotID == booking.slot_id){
            slotAlreadyInArray = true;
          }
        }

        //Adds the current slot in the loop if it's not already booked
        if(!slotAlreadyInArray) {
          availableSlots.push({"slotID": booking.slot_id});
        }
      }
  
      return res.status(200).json({ availableSlots });
      
    } catch (error) {
        next(error);
    }
  },

  async createFromQueue(message) {
    try {
      const sqsMessage = JSON.parse(message.Body);
      
      const { userID, userEmail, hairdresserID, slotID, date, startTime, duration } = sqsMessage;

      if (!userID || !userEmail || !hairdresserID || !slotID || !date || !startTime || !duration) {
        return console.log("Missing Required Information from Request");
      }

      const connectDB = await knex.connect();

      const newBooking = await connectDB('bookings').insert({
        user_id: userID,
        hairdresser_id: hairdresserID,
        slot_id: slotID,
        date: date,
        number_of_people: numberOfPeople,
        start_time: startTime,
        duration: duration 
      });

      const SQSParams = {
        MessageAttributes: {
          "bookingID": {
            DataType: "String",
            StringValue: String(newBooking[0])
          },
          "userID": {
            DataType: "String",
            StringValue: String(userID)
          },
          "hairdresserID": {
            DataType: "String",
            StringValue: String(hairdresserID)
          },
          "userEmail": {
            DataType: "String",
            StringValue: userEmail
          },
          "date": {
            DataType: "String",
            StringValue: date
          },
          "startTime": {
            DataType: "String",
            StringValue: startTime
          },
          "duration": {
            DataType: "String",
            StringValue: String(duration)
          },
        },
        MessageBody: "New Booking Confirmation Email",
        MessageDeduplicationId: String(newBooking[0]),  // Required for FIFO queues
        MessageGroupId: "Group1",  // Required for FIFO queues
        QueueUrl: "https://sqs.eu-west-1.amazonaws.com/128363080680/RESTaurant-BookingConfirmationEmail.fifo"
      }

      sqs.sendMessage(SQSParams, function(err, data){
        if (err) {
          console.log("Error", err);
          return res.status(500).json({ err });
        } else {
          console.log("Success", data.MessageId);
        }
      })

      return console.log("Booking Fully Processed Successfully");

    } catch (error) {
        console.log(error);
    }
  },
};