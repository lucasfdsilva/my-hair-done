const knex = require('../database/knex');

module.exports = {
	async index(req, res, next) {
		try {
			const connectDB = await knex.connect();
			const allSlots = await connectDB('slots');

			return res.json(allSlots);
		} catch (error) {
			next(error);
		}
	},

	async getAllSlotsForHairdresser(req, res, next) {
		const { hairdresserId } = req.params;

		try {
			const connectDB = await knex.connect();
			const allSlots = await connectDB('slots').where({
				hairdresser_id: hairdresserId,
			});

			return res.status(200).json({ slots: allSlots });
		} catch (error) {
			next(error);
		}
	},

	async view(req, res, next) {
		try {
			const { id } = req.params;

			if (!id) {
				return res.status(400).json({ message: 'Missing Slot ID' });
			}

			const connectDB = await knex.connect();
			const slotFromDB = await connectDB('slots').where({ id: id }).first();

			if (!slotFromDB)
				return res.status(400).json({ message: 'No Slot Found' });

			return res.status(200).json({ slot: slotFromDB });
		} catch (error) {
			next(error);
		}
	},

	async create(req, res, next) {
		try {
			const {
				hairdresserId,
				startTime,
				endTime,
				monday,
				tuesday,
				wednesday,
				thursday,
				friday,
				saturday,
				sunday,
			} = req.body;

			if (!hairdresserId || !startTime || !endTime) {
				return res
					.status(400)
					.json({ message: 'Missing Required Information from Request' });
			}

			const connectDB = await knex.connect();
			const newSlot = await connectDB('slots').insert({
				hairdresser_id: hairdresserId,
				start_time: startTime,
				end_time: endTime,
				monday: monday,
				tuesday: tuesday,
				wednesday: wednesday,
				thursday: thursday,
				friday: friday,
				saturday: saturday,
				sunday: sunday,
			});

			return res
				.status(201)
				.json({ message: 'Slot Created Successfully', newSlot: newSlot });
		} catch (error) {
			next(error);
		}
	},

	async update(req, res, next) {
		try {
			const {
				id,
				startTime,
				endTime,
				monday,
				tuesday,
				wednesday,
				thursday,
				friday,
				saturday,
				sunday,
			} = req.body;

			if (!id || !startTime || !endTime) {
				return res
					.status(400)
					.json({ message: 'Missing Required Information from Request' });
			}

			const connectDB = await knex.connect();
			const slotFromDB = await connectDB('slots').where({ id: id }).first();

			if (!slotFromDB)
				return res.status(400).json({ message: 'No Slot Found' });

			const updatedSlot = await connectDB('slots').where({ id: id }).update({
				start_time: startTime,
				end_time: endTime,
				monday: monday,
				tuesday: tuesday,
				wednesday: wednesday,
				thursday: thursday,
				friday: friday,
				saturday: saturday,
				sunday: sunday,
			});

			return res.status(200).json({ message: 'Slot updated successfully' });
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
			const slotFromDB = await connectDB('slots').where({ id: id }).first();

			if (!slotFromDB)
				return res.status(400).json({ message: 'No Slot Found' });

			const deletedSlot = await connectDB('slots').where({ id: id }).del();

			return res.status(200).json({ message: 'Slot deleted successfully' });
		} catch (error) {
			next(error);
		}
	},
};
