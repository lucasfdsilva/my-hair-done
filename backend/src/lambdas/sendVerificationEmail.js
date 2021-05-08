var aws = require('aws-sdk');
var ses = new aws.SES({ region: 'eu-west-1' });

exports.handler = (event, context, callback) => {
	const firstName = event.Records[0].messageAttributes.firstName.stringValue;
	const email = event.Records[0].messageAttributes.email.stringValue;
	const verificationToken =
		event.Records[0].messageAttributes.verificationToken.stringValue;

	var params = {
		Source: 'My Hair Done <support@myhairdone.co.uk>',
		Destination: {
			ToAddresses: [email],
			BccAddresses: ['lucas.dasilva@asystec.ie'],
		},
		ReplyToAddresses: ['support@myhairdone.co.uk'],
		Message: {
			Subject: {
				Charset: 'UTF-8',
				Data: `My Hair Done Registration - Email Verification`,
			},
			Body: {
				Html: {
					Charset: 'UTF-8',
					Data: `
            <img src="https://myhairdone-portfolioimages.s3-eu-west-1.amazonaws.com/Header+Logo+1200px.png"/>
            <h3>Thank you for registering with My Hair Done!</h3>
            <p>Hi ${firstName},</p>
            <p>Please click on the following link to verify your email address: https://myhairdone.co.uk/users/verify/${verificationToken}</p>
            </br>
            </br>
            <p>My Hair Done Team.</p>
            `,
				},
			},
		},
	};
	ses.sendEmail(params, function (err, data) {
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
