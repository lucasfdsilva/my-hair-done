const knex = require('../database/knex');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const AWS = require('aws-sdk');
AWS.config.update({ region: 'eu-west-1' });
const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });

module.exports = {
	async index(req, res, next) {
		try {
			const connectDB = await knex.connect();
			const allUsersFromDB = await connectDB('users');

			return res.status(200).json(allUsersFromDB);
		} catch (error) {
			next(error);
		}
	},

	async view(req, res, next) {
		try {
			const { id } = req.params;

			if (!id) {
				return res.status(400).json({ message: 'Missing User ID' });
			}

			const connectDB = await knex.connect();
			const userFromDB = await connectDB('users').where({ id: id }).first();

			if (!userFromDB)
				return res.status(400).json({ message: 'No User Found with this ID' });

			return res.status(200).json({ user: userFromDB });
		} catch (error) {
			next(error);
		}
	},

	async getAllHairdressers(req, res, next) {
		try {
			const connectDB = await knex.connect();
			const allHairdressersFromDB = await connectDB('users').where({
				is_hairdresser: true,
			});

			if (!allHairdressersFromDB) {
				return res
					.status(400)
					.json({ message: 'There are no registered hairdressers.' });
			}

			const allHairdressersWithReviews = [];

			for (const hairdresser of allHairdressersFromDB) {
				const reviews = await connectDB('reviews')
					.where({
						hairdresser_id: hairdresser.id,
					})
					.orderBy('created_at', 'desc');

				const hairdresserWithReviews = {
					id: hairdresser.id,
					first_name: hairdresser.first_name,
					last_name: hairdresser.last_name,
					dob: hairdresser.dob,
					mobile: hairdresser.mobile,
					email: hairdresser.email,
					profile_img_url: hairdresser.profile_img_url,
					created_at: hairdresser.created_at,
					home_service: hairdresser.home_service,
					hairdresser_since: hairdresser.hairdresser_since,
					addressLine1: hairdresser.addressLine1,
					addressLine2: hairdresser.addressLine2,
					city: hairdresser.city,
					county: hairdresser.county,
					country: hairdresser.country,
					reviews: reviews,
				};

				allHairdressersWithReviews.push(hairdresserWithReviews);
			}

			return res.json({ hairdressers: allHairdressersWithReviews });
		} catch (error) {
			next(error);
		}
	},

	async searchHairdressers(req, res, next) {
		try {
			const { name } = req.params;

			if (!name) {
				return res.status(400).json({ message: 'Missing Hairdresser Name' });
			}

			const whiteSpaces = /\s/g.test(name);

			if (whiteSpaces) {
				const namesArray = name.split(/[ ]+/);
				const firstName = namesArray[0];
				const lastName = namesArray[1];

				const connectDB = await knex.connect();
				const hairdressersFromDB = await connectDB('users')
					.where('first_name', 'like', `%${firstName}%`)
					.orWhere('last_name', 'like', `%${lastName}%`)
					.andWhere({ is_hairdresser: true });

				if (!hairdressersFromDB)
					return res
						.status(400)
						.json({ message: 'No Hairdressers Found. Please try again.' });

				const allHairdressersWithReviews = [];

				for (const hairdresser of hairdressersFromDB) {
					const reviews = await connectDB('reviews')
						.where({
							hairdresser_id: hairdresser.id,
						})
						.orderBy('created_at', 'desc');

					const hairdresserWithReviews = {
						id: hairdresser.id,
						first_name: hairdresser.first_name,
						last_name: hairdresser.last_name,
						dob: hairdresser.dob,
						mobile: hairdresser.mobile,
						email: hairdresser.email,
						profile_img_url: hairdresser.profile_img_url,
						created_at: hairdresser.created_at,
						home_service: hairdresser.home_service,
						hairdresser_since: hairdresser.hairdresser_since,
						addressLine1: hairdresser.addressLine1,
						addressLine2: hairdresser.addressLine2,
						city: hairdresser.city,
						county: hairdresser.county,
						country: hairdresser.country,
						reviews: reviews,
					};

					allHairdressersWithReviews.push(hairdresserWithReviews);
				}

				return res
					.status(200)
					.json({ hairdressers: allHairdressersWithReviews });
			}

			const connectDB = await knex.connect();
			const hairdressersFromDB = await connectDB('users')
				.where('first_name', 'like', `%${name}%`)
				.orWhere('last_name', 'like', `%${name}%`)
				.orWhere('email', 'like', `%${name}%`)
				.andWhere({ is_hairdresser: true });

			if (!hairdressersFromDB)
				return res
					.status(400)
					.json({ message: 'No Hairdressers Found. Please try again.' });

			const allHairdressersWithReviews = [];

			for (const hairdresser of hairdressersFromDB) {
				const reviews = await connectDB('reviews')
					.where({
						hairdresser_id: hairdresser.id,
					})
					.orderBy('created_at', 'desc');

				const hairdresserWithReviews = {
					id: hairdresser.id,
					first_name: hairdresser.first_name,
					last_name: hairdresser.last_name,
					dob: hairdresser.dob,
					mobile: hairdresser.mobile,
					email: hairdresser.email,
					profile_img_url: hairdresser.profile_img_url,
					created_at: hairdresser.created_at,
					home_service: hairdresser.home_service,
					hairdresser_since: hairdresser.hairdresser_since,
					addressLine1: hairdresser.addressLine1,
					addressLine2: hairdresser.addressLine2,
					city: hairdresser.city,
					county: hairdresser.county,
					country: hairdresser.country,
					reviews: reviews,
				};

				allHairdressersWithReviews.push(hairdresserWithReviews);
			}

			return res.status(200).json({ hairdressers: allHairdressersWithReviews });
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
				profileImgUrl,
			} = req.body;

			if (!firstName || !lastName || !dob || !mobile || !email || !password) {
				return res
					.status(400)
					.json({ message: 'Missing Required Information from Request' });
			}

			const connectDB = await knex.connect();
			const userFromDB = await connectDB('users')
				.where({ email: email })
				.first();

			if (userFromDB)
				return res.status(400).json({
					message:
						'Email address already registered. Please try again using a different email address',
				});

			const salt = await bcrypt.genSalt();
			const hashedPassword = await bcrypt.hash(password, salt);

			const verificationToken = crypto.randomBytes(20).toString('hex');

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
				profile_img_url: profileImgUrl,
				hairdresser_since: hairdresserSince,
				verification_token: verificationToken,
				is_hairdresser: isHairdresser,
			});

			const SQSParams = {
				MessageAttributes: {
					firstName: {
						DataType: 'String',
						StringValue: firstName,
					},
					email: {
						DataType: 'String',
						StringValue: email.toLowerCase(),
					},
					verificationToken: {
						DataType: 'String',
						StringValue: verificationToken,
					},
				},
				MessageBody: 'Information required to submit Verification Email',
				MessageDeduplicationId: verificationToken, // Required for FIFO queues
				MessageGroupId: 'Group1', // Required for FIFO queues
				QueueUrl:
					'https://sqs.eu-west-1.amazonaws.com/128363080680/myhairdone-SendEmailVerification.fifo',
			};

			sqs.sendMessage(SQSParams, function (err, data) {
				if (err) {
					console.log('Error', err);
					return res.status(500).json({ err });
				} else {
					console.log('Success', data.MessageId);
				}
			});

			return res
				.status(201)
				.json({ message: 'User Created Successfully', newUserID: newUser });
		} catch (error) {
			next(error);
		}
	},

	async uploadProfilePicture(req, res, next) {
		try {
			const file = req.files.file;

			if (!file) {
				return res
					.status(400)
					.json({ message: 'Missing image file from Request' });
			}

			console.log(file);

			const s3 = new AWS.S3.ManagedUpload({
				params: {
					Bucket: 'myhairdone-profilepictures',
					Key: file.name,
					Body: file.data,
					ContentType: 'image/jpeg',
				},
			});

			const promise = s3.promise();

			promise.then(
				function (data) {
					console.log('Successfully uploaded photo.');
					console.log(data);

					return res.status(200).json({
						message: 'Profile image uploaded successfully',
						url: data.Location,
					});
				},
				function (err) {
					console.log('Error uploading file to S3. ', err.message);
					return res
						.status(500)
						.json({ message: 'Error uploading file to S3.' });
				},
			);
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
				addressLine1,
				addressLine2,
				city,
				county,
				country,
				homeService,
				profile_img_url,
			} = req.body;

			if (!firstName || !lastName || !mobile) {
				return res
					.status(400)
					.json({ message: 'Missing Required Information from Request' });
			}

			const connectDB = await knex.connect();
			const userFromDB = await connectDB('users').where({ id: id }).first();

			if (!userFromDB)
				return res.status(400).json({ message: 'No User Found with this ID' });

			const updatedUser = await connectDB('users').where({ id: id }).update({
				first_name: firstName,
				last_name: lastName,
				mobile: mobile,
				addressLine1: addressLine1,
				addressLine2: addressLine2,
				city: city,
				county: county,
				country: country,
				home_service: homeService,
				profile_img_url: profile_img_url,
			});

			return res.status(200).json({ message: 'User updated successfully' });
		} catch (error) {
			next(error);
		}
	},

	async delete(req, res, next) {
		try {
			const { id } = req.body;

			if (!id) {
				return res
					.status(400)
					.json({ message: 'Missing Required Information from Request' });
			}

			const connectDB = await knex.connect();
			const userFromDB = await connectDB('users').where({ id: id }).first();

			if (!userFromDB)
				return res.status(400).json({ message: 'No User Found with this ID' });

			const deletedUser = await connectDB('users').where({ id: id }).del();

			return res.status(200).json({ message: 'User deleted successfully' });
		} catch (error) {
			next(error);
		}
	},

	async verifyEmailAddress(req, res, next) {
		try {
			const { verificationToken } = req.params;

			if (!verificationToken) {
				return res
					.status(400)
					.json({ message: 'Missing Required Information from Request' });
			}

			const connectDB = await knex.connect();
			const userFromDB = await connectDB('users')
				.where({ verification_token: verificationToken })
				.first();

			if (!userFromDB)
				return res
					.status(400)
					.json({ message: 'No User found with this verification token' });

			const verifiedUser = await connectDB('users')
				.where({ verification_token: verificationToken })
				.update({
					verified: 1,
				});

			return res
				.status(200)
				.json({ message: 'User email address verified successfully.' });
		} catch (error) {
			next(error);
		}
	},

	async sendVerificationEmail(req, res, next) {
		try {
			const { firstName, email } = req.body;

			if (!firstName || !email) {
				return res
					.status(400)
					.json({ message: 'Missing Required Information from Request' });
			}

			const connectDB = await knex.connect();
			const userFromDB = await connectDB('users')
				.where({ email: email })
				.first();

			if (!userFromDB)
				return res
					.status(400)
					.json({ message: 'No User found with this email' });

			const SQSParams = {
				MessageAttributes: {
					firstName: {
						DataType: 'String',
						StringValue: firstName,
					},
					email: {
						DataType: 'String',
						StringValue: email.toLowerCase(),
					},
					verificationToken: {
						DataType: 'String',
						StringValue: userFromDB.verification_token,
					},
				},
				MessageBody: 'Information required to submit Verification Email',
				MessageDeduplicationId: userFromDB.verification_token, // Required for FIFO queues
				MessageGroupId: 'Group1', // Required for FIFO queues
				QueueUrl:
					'https://sqs.eu-west-1.amazonaws.com/128363080680/myhairdone-SendEmailVerification.fifo',
			};

			sqs.sendMessage(SQSParams, function (err, data) {
				if (err) {
					console.log('Error', err);
					return res.status(500).json({ err });
				} else {
					console.log('Success', data.MessageId);
				}
			});

			return res
				.status(200)
				.json({ message: 'Verification Email sent successfully.' });
		} catch (error) {
			next(error);
		}
	},
};
