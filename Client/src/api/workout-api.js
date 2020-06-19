import { getTimeString } from "../utility";

export const postWorkout = (workoutData, title, time) => {
  return new Promise((resolve, reject) => {
    let data = {
      title: title,
      duration: getTimeString(time),
      exercises: workoutData,
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
