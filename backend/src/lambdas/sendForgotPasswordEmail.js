var aws = require('aws-sdk');
var ses = new aws.SES({ region: 'eu-west-1' });

exports.handler = (event, context, callback) => {
	const firstName = event.Records[0].messageAttributes.firstName.stringValue;
	const email = event.Records[0].messageAttributes.email.stringValue;
	const passwordResetToken =
		event.Records[0].messageAttributes.passwordResetToken.stringValue;

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
				Data: `My Hair Done - Forgot Password`,
			},
			Body: {
				Html: {
					Charset: 'UTF-8',
					Data: `
            <img src="https://myhairdone-portfolioimages.s3-eu-west-1.amazonaws.com/Header+Logo+1200px.png"/>
            <h3>Password Reset Request</h3>
            <p>Hi ${firstName},</p>
            <p>To reset your password please click on the following link: https://myhairdone.co.uk/forgotpassword/newpassword/${passwordResetToken}</p>
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
