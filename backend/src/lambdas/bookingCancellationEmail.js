var aws = require('aws-sdk');
var ses = new aws.SES({ region: 'eu-west-1' });

exports.handler = (event, context, callback) => {
	const bookingID = event.Records[0].messageAttributes.bookingID.stringValue;
	const userEmail = event.Records[0].messageAttributes.userEmail.stringValue;
	const userName = event.Records[0].messageAttributes.userName.stringValue;
	const hairdresserId =
		event.Records[0].messageAttributes.hairdresserId.stringValue;
	const hairdresserEmail =
		event.Records[0].messageAttributes.hairdresserEmail.stringValue;
	const hairdresserMobile =
		event.Records[0].messageAttributes.hairdresserMobile.stringValue;
	const hairdresserName =
		event.Records[0].messageAttributes.hairdresserName.stringValue;
	const date = event.Records[0].messageAttributes.date.stringValue;
	const startTime = event.Records[0].messageAttributes.startTime.stringValue;
	const endTime = event.Records[0].messageAttributes.endTime.stringValue;

	var paramsUser = {
		Source: 'My Hair Done <support@myhairdone.co.uk>',
		Destination: {
			ToAddresses: [userEmail],
			BccAddresses: ['lucas.dasilva@asystec.ie'],
		},
		ReplyToAddresses: ['support@myhairdone.co.uk'],
		Message: {
			Subject: {
				Charset: 'UTF-8',
				Data: `My Hair Done Booking Cancelled - Booking ID: ${bookingID}.`,
			},
			Body: {
				Html: {
					Charset: 'UTF-8',
					Data: `
            <img src="https://myhairdone-portfolioimages.s3-eu-west-1.amazonaws.com/Header+Logo+1200px.png" width="450" height="150" alt="My Hair Done Logo.png"/>
            <h3>Your booking has been cancelled.</h3>
            <p>Hi ${userName},</p>
            <p>Your booking with ${hairdresserName} has been cancelled. Below are the booking details. You can also see <a href="https://myhairdone.co.uk/bookings">your bookings</a> at your account at any time.</p>
            
            <h4>Booking Details</h4>
            <p><b>Booking ID:</b> ${bookingID}</p>
            <p><b>Date:</b> ${date}</p>
            <p><b>Start Time:</b> ${startTime}</p>
            <p><b>End Time:</b> ${endTime} minutes</p>
            
             <h4>Hairdresser Details</h4>
             <p><b>Name:</b> ${hairdresserName}</p>
             <p><b>Email:</b> ${hairdresserEmail}</p>
             <p><b>Mobile:</b> ${hairdresserMobile}</p>
            
            </br>
            <p>Thank you</p>
            <p>My Hair Done Team.</p>
            `,
				},
			},
		},
	};

	var paramsHairdresser = {
		Source: 'My Hair Done <support@myhairdone.co.uk>',
		Destination: {
			ToAddresses: [hairdresserEmail],
			BccAddresses: ['lucas.dasilva@asystec.ie'],
		},
		ReplyToAddresses: ['support@myhairdone.co.uk'],
		Message: {
			Subject: {
				Charset: 'UTF-8',
				Data: `My Hair Done Booking Cancelled - Booking ID: ${bookingID}.`,
			},
			Body: {
				Html: {
					Charset: 'UTF-8',
					Data: `
            <img src="https://myhairdone-portfolioimages.s3-eu-west-1.amazonaws.com/Header+Logo+1200px.png" width="450" height="150" alt="My Hair Done Logo.png"/>
            <h3>One of your bookings has been cancelled.</h3>
            <p>Hi ${hairdresserName},</p>
            <p>Your booking with ${userName} has been cancelled. Below are the booking details. You can also see <a href="https://myhairdone.co.uk/bookings">your bookings</a> at your account at any time.</p>
            
            <h4>Booking Details</h4>
            <p><b>Booking ID:</b> ${bookingID}</p>
            <p><b>Date:</b> ${date}</p>
            <p><b>Start Time:</b> ${startTime}</p>
            <p><b>End Time:</b> ${endTime} minutes</p>
            
             <h4>User Details</h4>
             <p><b>Name:</b> ${userName}</p>
             <p><b>Email:</b> ${userEmail}</p>
            
            </br>
            <p>Thank you</p>
            <p>My Hair Done Team.</p>
            `,
				},
			},
		},
	};

	ses.sendEmail(paramsUser, function (err, data) {
		callback(null, { err: err, data: data });
		if (err) {
			console.log(err);
			context.fail(err);
		} else {
			console.log(data);
			context.succeed(event);
		}
	});

	ses.sendEmail(paramsHairdresser, function (err, data) {
		callback(null, { err: err, data: data });
		if (err) {
			console.log(err);
			context.fail(err);
		} else {
			console.log(data);
			context.succeed(event);
		}
	});
};
