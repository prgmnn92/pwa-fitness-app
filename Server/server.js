// jshint esversion:6
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

let uri = "mongodb://localhost:27017/workoutDB";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));

let Schema = mongoose.Schema;

//Ein Trainingstag
let workoutSchema = new Schema({
  title: String,
  date: Date,
  exercises: [
    {
      name: String,
      sets: [
        {
          reps: Number,
          weight: Number,
        },
      ],
    },
  ],
});

//Eine Uebung
let exerciseSchema = new Schema({
  name: String,
  sets: [
    {
      date: Date,
      reps: Number,
      weight: Number,
    },
  ],
});

let workout = mongoose.model("workout", workoutSchema);
let exercise = mongoose.model("exercise", exerciseSchema);

let instance = new workout({
  title: "Improvisiertes Training",
  date: new Date(),
  exercises: [
    {
      name: "Bankdruecken",
      sets: [
        {
          reps: 10,
          weight: 20,
        },
        {
          reps: 10,
          weight: 20,
        },
        {
          reps: 10,
          weight: 20,
        },
        {
          reps: 10,
          weight: 20,
        },
      ],
    },
  ],
});

//Workout daten empfangen
app.post("/workout", (req, res) => {
  let workoutData = req.body;

  console.log(workoutData);

  res.send("WUHUWWW");
});

// db.once("open", function () {
//   instance.save((err) => (err ? console.log(err) : null));
// });

app.listen(port, (error) => {
  if (error) throw error;
  console.log("Server running on port " + port);
});
