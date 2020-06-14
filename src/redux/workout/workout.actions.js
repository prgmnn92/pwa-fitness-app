import WorkoutActionTypes from "./workout.types";

export const resetWorkout = () => ({
  type: WorkoutActionTypes.WORKOUT_RESET,
});

export const addExercise = (name) => ({
  type: WorkoutActionTypes.EXERCISE_ADD,
  payload: {
    [name]: [
      {
        Wiederholungen: 0,
        Gewicht: 0,
        Complete: false,
      },
    ],
  },
});

export const removeExercise = () => ({});

export const addSet = (name) => ({
  type: WorkoutActionTypes.SET_ADD,
  payload: name,
});

export const removeSet = () => ({});

export const completeSet = (name, number, weight, reps) => ({
  type: WorkoutActionTypes.SET_COMPLETE,
  payload: { name, number, weight, reps },
});
