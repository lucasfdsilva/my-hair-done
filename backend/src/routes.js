const express = require('express');

const UserSessionController = require('./controllers/UserSessionController');
const HairdresserSessionController = require('./controllers/HairdresserSessionController');
const UserController = require('./controllers/UserController');
const HairdresserController = require('./controllers/HairdresserController');
const PortfolioPostController = require('./controllers/PortfolioPostController');
const SlotController = require('./controllers/SlotController');

const openRoutes = express.Router();

//Sessions Controller Routes
openRoutes.post('/users/sessions', UserSessionController.create);
openRoutes.post('/hairdressers/sessions', HairdresserSessionController.create);

//User Controller Routes
openRoutes.get('/users', UserController.index)
openRoutes.get('/users/:id', UserController.view);
openRoutes.post('/users', UserController.create);
openRoutes.put('/users', UserController.update);
openRoutes.delete('/users', UserController.delete);
openRoutes.put('/users/verify/:verificationToken', UserController.verifyEmailAddress);
openRoutes.post('/users/verify/send', UserController.sendVerificationEmail);

//Hairdresser Controller Routes
openRoutes.get('/hairdressers', HairdresserController.index)
openRoutes.get('/hairdressers/:id', HairdresserController.view);
openRoutes.post('/hairdressers', HairdresserController.create);
openRoutes.put('/hairdressers', HairdresserController.update);
openRoutes.delete('/hairdressers', HairdresserController.delete);
openRoutes.put('/hairdressers/verify/:verificationToken', HairdresserController.verifyEmailAddress);
openRoutes.post('/hairdressers/verify/send', HairdresserController.sendVerificationEmail);

//Menu Item Controller Routes
openRoutes.get('/portfolioposts', PortfolioPostController.index);
openRoutes.get('/portfolioposts/:id', PortfolioPostController.view);
openRoutes.post('/portfolioposts', PortfolioPostController.create);
openRoutes.put('/portfolioposts', PortfolioPostController.update);
openRoutes.delete('/portfolioposts', PortfolioPostController.delete);


//Restaurant Available Slots Controller Routes
openRoutes.get('/slots', SlotController.index);
openRoutes.get('/slots/:id', SlotController.view);
openRoutes.post('/slots', SlotController.create);
openRoutes.put('/slots', SlotController.update);
openRoutes.delete('/slots', SlotController.delete);

/*

//Bookings Controller Routes
openRoutes.get('/bookings', BookingController.index);
openRoutes.get('/bookings/:id', BookingController.view);
openRoutes.post('/bookings', BookingController.create);
openRoutes.put('/bookings', BookingController.update);
openRoutes.delete('/bookings', BookingController.delete);
openRoutes.get('/availability', BookingController.checkSlotsAvailability);
*/

module.exports = {
    openRoutes: openRoutes
}