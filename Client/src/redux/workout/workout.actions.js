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

export const removeExercise = (name) => ({
  type: WorkoutActionTypes.EXERCISE_REMOVE,
  payload: name,
});

export const resetExercise = (name) => ({
  type: WorkoutActionTypes.EXERCISE_RESET,
  payload: name,
});

export const addSet = (name) => ({
  type: WorkoutActionTypes.SET_ADD,
  payload: name,
});

export const removeSet = (name, id) => ({
  type: WorkoutActionTypes.SET_REMOVE,
  payload: { name: name, id: id },
});

export const completeSet = (name, number, weight, reps) => ({
  type: WorkoutActionTypes.SET_COMPLETE,
  payload: { name, number, weight, reps },
});

export const saveWorkouts = (workouts) => ({
  type: WorkoutActionTypes.WORKOUT_SAVE,
  payload: workouts,
});
