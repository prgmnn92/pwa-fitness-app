import WorkoutActionTypes from './workout.types';

const INITIAL_STATE = {
	workoutData: {},
	pastWorkoutData: {},
	timeline: [],
	date: ''
};

const workoutReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case WorkoutActionTypes.WORKOUT_RESET:
			return {
				...state,
				workoutData: {}
			};
		case WorkoutActionTypes.WORKOUT_SAVE:
			return {
				...state,
				pastWorkoutData: { ...action.payload }
			};
		case WorkoutActionTypes.EXERCISE_ADD:
			return {
				...state,
				workoutData: {
					...state.workoutData,
					...action.payload
				}
			};
		case WorkoutActionTypes.EXERCISE_REMOVE:
			let oldWorkoutData = { ...state.workoutData };
			delete oldWorkoutData[action.payload];

			return {
				...state,
				workoutData: { ...oldWorkoutData }
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
							Complete: false
						}
					]
				}
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
							Complete: false
						}
					]
				}
			};
		case WorkoutActionTypes.SET_REMOVE:
			return {
				...state,
				workoutData: {
					...state.workoutData,
					[action.payload.name]: state.workoutData[action.payload.name].filter(
						(_, id) => id !== action.payload.id
					)
				}
			};
		case WorkoutActionTypes.SET_COMPLETE:
			let tempWorkoutData = {
				...state.workoutData
			};

			tempWorkoutData[action.payload.name][action.payload.number].Complete = true;

			tempWorkoutData[action.payload.name][action.payload.number].Gewicht = action.payload.weight;

			tempWorkoutData[action.payload.name][action.payload.number].Wiederholungen = action.payload.reps;

			return {
				...state,
				workoutData: {
					...state.workoutData,
					...tempWorkoutData
				}
			};

		case WorkoutActionTypes.TIMELINE_SHOW:
			//action.payload . year . month(+1), value, class
			// mit der payload daten aus dem pastworkout object suchen und in die timeline einfuegen... body head
			let workouts = [];

			Object.keys(state.pastWorkoutData).forEach((key) => {
				let date = state.pastWorkoutData[key].date.split('/'); //0: TAG 1:MONAT 2:JAHR

				if (
					Number(date[0]) === action.payload.value &&
					Number(date[1]) === action.payload.month + 1 &&
					Number(date[2]) === action.payload.year
				) {
					workouts.push(state.pastWorkoutData[key]);
				}
			});

			return {
				...state,
				timeline: workouts,
				date:
					'' +
					('00' + action.payload.value).slice(-2) +
					'/' +
					('00' + (action.payload.month + 1)).slice(-2) +
					'/' +
					action.payload.year
			};
		default:
			return state;
	}
};

export default workoutReducer;
