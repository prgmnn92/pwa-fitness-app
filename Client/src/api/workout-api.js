import { getTimeString } from "../utility";

export const postWorkout = (workoutData, title, time) => {
  let data = {
    title: title,
    duration: getTimeString(time),
    exercises: workoutData,
  };

  fetch("http://localhost:5000/workout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.text())
    .then((data) => console.log("success", data))
    .catch((error) => console.log("error message: ", error));
};
