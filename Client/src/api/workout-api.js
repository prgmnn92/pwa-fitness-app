import { getTimeString } from "../utility";

export const postWorkout = (workoutData, title, time, notes) => {
  return new Promise((resolve, reject) => {
    let data = {
      title: title,
      duration: getTimeString(time),
      exercises: workoutData,
      notes: notes,
    };

    let err = false;

    fetch("http://localhost:5000/workout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.text())
      .then((data) => console.log("success", data))
      .catch((error) => {
        err = error;
        console.log("error message: ", error);
      });

    if (!err) {
      resolve();
    } else {
      reject("Something went wrong");
    }
  });
};

export const getWorkouts = () => {
  return new Promise((resolve, reject) => {
    fetch("http://localhost:5000/workout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
