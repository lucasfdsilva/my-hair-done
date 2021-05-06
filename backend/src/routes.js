const express = require('express');

const SessionController = require('./controllers/SessionController');
const UserController = require('./controllers/UserController');
const PortfolioPostController = require('./controllers/PortfolioPostController');
const PortfolioImagesController = require('./controllers/PortfolioImagesController');
const SlotController = require('./controllers/SlotController');
const BookingController = require('./controllers/BookingController');
const ReviewController = require('./controllers/ReviewController');

const openRoutes = express.Router();

/*
//API Home
openRoutes.get('/', function(req, res){
    return res.sendFile(__dirname + '/public/index.html');
});
openRoutes.get('/css', function(req, res){
    return res.sendFile(__dirname + '/public/styles.css');
});
*/

//Sessions Controller Routes
openRoutes.post('/sessions', SessionController.create);

//User Controller Routes
openRoutes.get('/users', UserController.index);
openRoutes.get('/users/hairdressers', UserController.getAllHairdressers);
openRoutes.get('/users/hairdressers/:name', UserController.searchHairdressers);
openRoutes.get('/users/:id', UserController.view);
openRoutes.post('/users', UserController.create);
openRoutes.put('/users', UserController.update);
openRoutes.delete('/users', UserController.delete);
openRoutes.put(
	'/users/verify/:verificationToken',
	UserController.verifyEmailAddress,
);
openRoutes.post('/users/verify/send', UserController.sendVerificationEmail);
openRoutes.post(
	'/forgotpassword/send',
	UserController.sendRecoverPasswordEmail,
);
openRoutes.post('/forgotpassword/newpassword', UserController.resetPassword);
openRoutes.post('/users/upload', UserController.uploadProfilePicture);

//Portfolio Posts Controller Routes
openRoutes.get('/portfolioposts', PortfolioPostController.index);
openRoutes.get(
	'/portfolioposts/hairdressers/:hairdresserId',
	PortfolioPostController.getAllPostsForHairdresser,
);
openRoutes.get(
	'/portfolioposts/hairdressers/:hairdresserId/featured',
	PortfolioPostController.getFeaturedPostsForHairdresser,
);
openRoutes.get('/portfolioposts/:id', PortfolioPostController.view);
openRoutes.post('/portfolioposts', PortfolioPostController.create);
openRoutes.put('/portfolioposts', PortfolioPostController.update);
openRoutes.delete('/portfolioposts', PortfolioPostController.delete);

//Portfolio Images Controller Routes
openRoutes.get('/portfolioimages', PortfolioImagesController.index);
openRoutes.get(
	'/portfolioimages/posts/:postId',
	PortfolioImagesController.getAllImagesForPost,
);
openRoutes.get('/portfolioimages/:id', PortfolioImagesController.view);
openRoutes.post('/portfolioimages', PortfolioImagesController.create);
openRoutes.put('/portfolioimages', PortfolioImagesController.update);
openRoutes.delete('/portfolioimages', PortfolioImagesController.delete);

//Hairdresser Slots Controller Routes
openRoutes.get('/slots', SlotController.index);
openRoutes.get('/slots/:id', SlotController.view);
openRoutes.get(
	'/slots/hairdressers/:hairdresserId',
	SlotController.getAllSlotsForHairdresser,
);
openRoutes.post('/slots', SlotController.create);
openRoutes.put('/slots', SlotController.update);
openRoutes.delete('/slots', SlotController.delete);

//Bookings Controller Routes
openRoutes.get('/bookings/users/:userId', BookingController.indexUser);
openRoutes.get(
	'/bookings/hairdressers/:hairdresserId',
	BookingController.indexHairdresser,
);
openRoutes.get('/bookings/:id', BookingController.view);
openRoutes.post('/bookings', BookingController.create);
openRoutes.put('/bookings', BookingController.update);
openRoutes.delete('/bookings', BookingController.delete);
openRoutes.get('/availability', BookingController.checkSlotsAvailability);

//Reviews Controller Routes
openRoutes.get('/reviews', ReviewController.index);
openRoutes.get(
	'/reviews/hairdressers/:hairdresserId',
	ReviewController.getAllReviewsForHairdresser,
);
openRoutes.get('/reviews/:id', ReviewController.view);
openRoutes.get(
	'/reviews/bookings/:bookingId',
	ReviewController.viewReviewByBooking,
);
openRoutes.post('/reviews', ReviewController.create);
openRoutes.put('/reviews', ReviewController.update);
openRoutes.delete('/reviews', ReviewController.delete);

module.exports = {
	openRoutes: openRoutes,
};
