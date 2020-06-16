import WorkoutActionTypes from "./workout.types";

const INITIAL_STATE = {
  workoutData: {},
};

const workoutReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case WorkoutActionTypes.WORKOUT_RESET:
      return {
        ...state,
        workoutData: {},
      };
    case WorkoutActionTypes.EXERCISE_ADD:
      return {
        ...state,
        workoutData: {
          ...state.workoutData,
          ...action.payload,
        },
      };
    case WorkoutActionTypes.EXERCISE_REMOVE:
      return {
        ...state,
      };
    case WorkoutActionTypes.SET_ADD:
      return {
        ...state,
        workoutData: {
          ...state.workoutData,
          [action.payload]: [
            ...state.workoutData[action.payload],
            {
              Wiederholungen: 0,
              Gewicht: 0,
              Complete: false,
            },
          ],
        },
      };
    case WorkoutActionTypes.SET_REMOVE:
      return {
        ...state,
      };
    case WorkoutActionTypes.SET_COMPLETE:
      let tempWorkoutData = {
        ...state.workoutData,
      };

      tempWorkoutData[action.payload.name][
        action.payload.number
      ].Complete = true;

      tempWorkoutData[action.payload.name][action.payload.number].Gewicht =
        action.payload.weight;

      tempWorkoutData[action.payload.name][
        action.payload.number
      ].Wiederholungen = action.payload.reps;

      return {
        ...state,
        workoutData: {
          ...state.workoutData,
          ...tempWorkoutData,
        },
      };
    default:
      return state;
  }
};

export default workoutReducer;
