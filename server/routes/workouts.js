const router = require('express').Router();
const Workout = require('../models/workout.model');
const moment = require('moment');

router.route('/').get((req, res) => {
	Workout.find((err, results) => {
		if (!err) {
			res.send(results);

			console.log(results);
		} else {
			res.send(err);
		}
	});
});

router.route('/add').post((req, res) => {
	let workoutData = req.body;
	let date = moment().format('DD/MM/YYYY');

	let title = workoutData.title ? workoutData.title : 'Improvisiertes Training';

	let exercises = Object.keys(workoutData.exercises).map((key) => {
		let sets = workoutData.exercises[key].map(({ Wiederholungen, Gewicht }) => ({
			reps: Wiederholungen,
			weight: Gewicht
		}));

		return {
			name: key,
			sets: [ ...sets ]
		};
	});

	const workout = new Workout({
		title: workoutData.title,
		date: date,
		duration: workoutData.duration,
		exercises: [ ...exercises ]
	});

	workout.save((err) => (err ? res.send(err) : res.send('Succesfully added workout')));

	console.log('Added a workout');
});

module.exports = router;
