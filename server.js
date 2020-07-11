// jshint esversion:6
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const moment = require('moment');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

let uri = 'mongodb://localhost:27017/workoutDB';

mongoose.connect(process.env.MONGODB_URI || uri, {
	useFindAndModify: false,
	useNewUrlParser: true,
	useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

let Schema = mongoose.Schema;

//Ein Trainingstag
let workoutSchema = new Schema({
	title: String,
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
});

//Eine Uebung
let exerciseSchema = new Schema({
	name: String,
	allSets: [
		{
			date: String,
			sets: [
				{
					reps: Number,
					weight: Number
				}
			]
		}
	]
});

let Workout = mongoose.model('workout', workoutSchema);
let Exercise = mongoose.model('exercise', exerciseSchema);

//Workout daten empfangen
app
	.get('/workout', (req, res) => {
		Workout.find((err, results) => {
			if (!err) {
				res.send(results);

				console.log(results);
			} else {
				res.send(err);
			}
		});
	})
	.post('/workout', (req, res) => {
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

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')); // relative path
	});
}

app.listen(port, (error) => {
	if (error) throw error;
	console.log('Server running on port ' + port);
});
