const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const workoutSchema = new Schema(
	{
		title: {
			type: String,
			trim: true
		},
		date: String,
		duration: String,
		exercises: [
			{
				name: String,
				sets: [
					{
						reps: Number,
						weight: Number
					}
				]
			}
		]
	},
	{
		timestamps: true
	}
);

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;
