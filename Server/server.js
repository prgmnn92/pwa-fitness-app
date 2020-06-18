// jshint esversion:6
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const moment = require("moment");

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

let uri = "mongodb://localhost:27017/workoutDB";

mongoose.connect(uri, {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));

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
          weight: Number,
        },
      ],
    },
  ],
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
          weight: Number,
        },
      ],
    },
  ],
});

let Workout = mongoose.model("workout", workoutSchema);
let Exercise = mongoose.model("exercise", exerciseSchema);

const bulkArray = async (inputData, Model) => {
  try {
    let exerciseArray = await inputData.map(({ name, sets }) => {
      let tmp;
      let date = moment().format("DD/MM/YYYY");

      Exercise.findOne({ name: name }).then((err, res) => {
        if (!err) {
          if (res) {
            tmp = {
              updateOne: {
                filter: { name: name },
                update: {
                  $push: {
                    allSets: {
                      date: date,
                      sets: [...sets],
                    },
                  },
                },

                upsert: true,
              },
            };
          } else {
            tmp = {
              insertOne: {
                document: {
                  name: name,
                  allSets: [
                    {
                      date: date,
                      sets: [...sets],
                    },
                  ],
                },
              },
            };
          }
        }
      });

      return tmp;
    });

    return exerciseArray;
  } catch (error) {
    console.log(error);
  }
};

//Workout daten empfangen
app.post("/workout", async (req, res) => {
  let workoutData = req.body;
  let date = moment().format("DD/MM/YYYY");

  //console.log(workoutData);

  let title = workoutData.title ? workoutData.title : "Improvisiertes Training";

  let exerciseArray = [];

  let keyList = [];

  let exercises = Object.keys(workoutData.exercises).map((key) => {
    let sets = workoutData.exercises[key].map(
      ({ Wiederholungen, Gewicht }) => ({
        reps: Wiederholungen,
        weight: Gewicht,
      })
    );

    keyList.push({ name: key, sets: [...sets] });

    return {
      name: key,
      sets: [...sets],
    };
  });

  const arr = await bulkArray(keyList, Exercise);

  // keyList.forEach(async ({ name, sets }) => {
  //   await Exercise.findOne({ name: name }).then((err, result) => {
  //     if (!err) {
  //       if (result) {
  //         exerciseArray.push({
  //           updateOne: {
  //             filter: { name: name },
  //             update: {
  //               $push: {
  //                 allSets: {
  //                   date: date,
  //                   sets: [...sets],
  //                 },
  //               },
  //             },

  //             upsert: true,
  //           },
  //         });
  //       } else {
  //         exerciseArray.push({
  //           insertOne: {
  //             document: {
  //               name: name,
  //               allSets: [
  //                 {
  //                   date: date,
  //                   sets: [...sets],
  //                 },
  //               ],
  //             },
  //           },
  //         });
  //       }
  //     } else {
  //       console.log(err);
  //     }
  //   });
  // });

  console.log("res", arr);

  await Exercise.bulkWrite([...arr])
    .then((res) => {
      // Prints "1 1 1"
      console.log(res.insertedCount, res.modifiedCount, res.deletedCount);
    })
    .catch((err) => console.log("bulk error:", err));

  const workout = new Workout({
    title: workoutData.title,
    date: date,
    duration: workoutData.duration,
    exercises: [...exercises],
  });

  workout.save((err) =>
    err ? res.send(err) : res.send("Succesfully added workout")
  );
});

// db.once("open", function () {
//   instance.save((err) => (err ? console.log(err) : null));
// });

app.listen(port, (error) => {
  if (error) throw error;
  console.log("Server running on port " + port);
});
