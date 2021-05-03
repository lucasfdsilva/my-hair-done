const knex = require('../database/knex');

module.exports = {
	async index(req, res, next) {
		try {
			const connectDB = await knex.connect();
			const allReviews = await connectDB('reviews');

			return res.json(allReviews);
		} catch (error) {
			next(error);
		}
	},

	async getAllReviewsForHairdresser(req, res, next) {
		const { hairdresserId } = req.params;

		try {
			const connectDB = await knex.connect();
			const allReviews = await connectDB('reviews').where({
				hairdresser_id: hairdresserId,
			});

			return res.status(200).json({ reviews: allReviews });
		} catch (error) {
			next(error);
		}
	},

	async view(req, res, next) {
		try {
			const { id } = req.params;

			if (!id) {
				return res.status(400).json({ message: 'Missing review ID' });
			}

			const connectDB = await knex.connect();
			const reviewFromDB = await connectDB('reviews').where({ id: id }).first();

			if (!reviewFromDB)
				return res.status(400).json({ message: 'No review Found' });

			return res.status(200).json({ review: reviewFromDB });
		} catch (error) {
			next(error);
		}
	},

	async create(req, res, next) {
		try {
			const { hairdresserId, userId, headline, description, rating } = req.body;

			if (!hairdresserId || !userId || !headline || !description || !rating) {
				return res
					.status(400)
					.json({ message: 'Missing Required Information from Request' });
			}

			const connectDB = await knex.connect();
			const newReview = await connectDB('reviews').insert({
				hairdresser_id: hairdresserId,
				user_id: userId,
				headline: headline,
				description: description,
				rating: rating,
			});

			return res
				.status(201)
				.json({ message: 'Review Created Successfully', newReview: newReview });
		} catch (error) {
			next(error);
		}
	},

	async update(req, res, next) {
		try {
			const { id, headline, description, rating } = req.body;

			if (!id || !headline || !description || !rating) {
				return res
					.status(400)
					.json({ message: 'Missing Required Information from Request' });
			}

			const connectDB = await knex.connect();
			const reviewFromDB = await connectDB('reviews').where({ id: id }).first();

			if (!reviewFromDB)
				return res.status(400).json({ message: 'No review Found' });

			const updatedReview = await connectDB('reviews')
				.where({ id: id })
				.update({
					headline: headline,
					description: description,
					rating: rating,
				});

			return res.status(200).json({ message: 'Review updated successfully' });
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
			const reviewFromDB = await connectDB('reviews').where({ id: id }).first();

			if (!reviewFromDB)
				return res.status(400).json({ message: 'No review Found' });

			const deletedReview = await connectDB('reviews').where({ id: id }).del();

			return res.status(200).json({ message: 'review deleted successfully' });
		} catch (error) {
			next(error);
		}
	},
};
