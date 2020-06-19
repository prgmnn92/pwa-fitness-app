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
      let newWorkoutData = {};
      Object.keys(state.workoutData)
        .map((key) => {
          if (key !== action.payload) {
            return {
              [key]: state.workoutData[key],
            };
          } else {
            return null;
          }
        })
        .filter((object) => object !== null)
        .forEach((object) => {
          let key = Object.keys(object);

          newWorkoutData[key] = object[key];
        });

      return {
        ...state,
        workoutData: { ...newWorkoutData },
      };
    case WorkoutActionTypes.EXERCISE_RESET:
      return {
        ...state,
        workoutData: {
          ...state.workoutData,
          [action.payload]: [
            {
              Wiederholungen: 0,
              Gewicht: 0,
              Complete: false,
            },
          ],
        },
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
        workoutData: {
          ...state.workoutData,
          [action.payload.name]: state.workoutData[action.payload.name].filter(
            (_, id) => id !== action.payload.id
          ),
        },
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
