import moment from 'moment';

export const convertObjectForExerciseBox = (object) => {
	let newArray = [];

	newArray = Object.keys(object).map((key) => {
		let name = key;
		let completedSets = 0;

		let openSets = object[key].length;

		for (let i = 0; i < openSets; i++) {
			if (object[key][i]['Complete']) {
				completedSets += 1;
			}
		}

		return {
			name,
			openSets,
			completedSets
		};
	});

	return newArray;
};

export const getActualWeekDay = (dayNumber) => {
	return moment().startOf('isoWeek').add(dayNumber, 'day').format('DD');
};

export const getActualDayWithMonth = (dayNumber) => {
	return moment().startOf('isoWeek').add(dayNumber, 'day').format('DD. MMMM');
};

export const getActualWeekString = () => {
	return getActualDayWithMonth(0) + '-' + getActualDayWithMonth(6);
};

export const getWeekInDataFormat = (operator) => {
	if (operator === undefined) return;
	let weekArr = [];
	if (operator <= 0) {
		weekArr.push(
			moment().startOf('isoWeek').add(0, 'day').subtract(Math.abs(operator), 'week').format('dd/mm/yyyy')
		);
		weekArr.push(
			moment().startOf('isoWeek').add(6, 'day').subtract(Math.abs(operator), 'week').format('dd/mm/yyyy')
		);
	} else {
		weekArr.push(moment().startOf('isoWeek').add(0, 'day').add(operator, 'week').format('dd/mm/yyyy'));
		weekArr.push(moment().startOf('isoWeek').add(6, 'day').add(operator, 'week').format('dd/mm/yyyy'));
	}

	return weekArr;
};

export const checkIfDateIsBetweenWeek = (date, operator) => {
	let splittedDate = date.split('/');

	//console.log('splittedDate: ', `${splittedDate[3]}-${splittedDate[2]}-${splittedDate[0]}}`);
	let startOfWeek, endOfWeek;

	if (operator <= 0) {
		startOfWeek = moment().startOf('isoWeek').add(0, 'day').subtract(Math.abs(operator), 'week');
		endOfWeek = moment().startOf('isoWeek').add(6, 'day').subtract(Math.abs(operator), 'week');
	} else {
		startOfWeek = moment().startOf('isoWeek').add(0, 'day').add(operator, 'week');
		endOfWeek = moment().startOf('isoWeek').add(6, 'day').add(operator, 'week');
	}

	console.log();

	return moment(`${splittedDate[2]}-${splittedDate[1]}-${splittedDate[0]}`).isBetween(startOfWeek, endOfWeek);
};

export const getWeekString = (operator) => {
	if (operator === undefined) return;
	let weekString;
	if (operator <= 0) {
		weekString =
			moment().startOf('isoWeek').add(0, 'day').subtract(Math.abs(operator), 'week').format('DD. MMMM') +
			' - ' +
			moment().startOf('isoWeek').add(6, 'day').subtract(Math.abs(operator), 'week').format('DD. MMMM');
	} else {
		weekString =
			moment().startOf('isoWeek').add(0, 'day').add(operator, 'week').format('DD. MMMM') +
			' - ' +
			moment().startOf('isoWeek').add(6, 'day').add(operator, 'week').format('DD. MMMM');
	}

	return weekString;
};

export const getMonthString = (operator) => {
	if (operator === undefined) return;
	let monthString;
	if (operator <= 0) {
		monthString = moment().subtract(Math.abs(operator), 'month').format('MMMM');
	} else {
		monthString = moment().add(operator, 'month').format('MMMM');
	}

	return monthString;
};

export const getYearString = (operator) => {
	if (operator === undefined) return;
	let yearString;
	if (operator <= 0) {
		yearString = moment().subtract(Math.abs(operator), 'year').format('YYYY');
	} else {
		yearString = moment().add(operator, 'year').format('YYYY');
	}

	return yearString;
};

// const dummyData = {
//   Bankdruecken: [
//     {
//       Wiederholungen: 10,
//       Gewicht: 50,
//       Complete: true,
//     },
//     {
//       Wiederholungen: 10,
//       Gewicht: 50,
//       Complete: true,
//     },
//     {
//       Wiederholungen: 10,
//       Gewicht: 50,
//       Complete: true,
//     },
//   ],
//   Kreuzheben: [
//     {
//       Wiederholungen: 10,
//       Gewicht: 50,
//       Complete: true,
//     },
//     {
//       Wiederholungen: 10,
//       Gewicht: 50,
//       Complete: true,
//     },
//     {
//       Wiederholungen: 10,
//       Gewicht: 50,
//       Complete: true,
//     },
//   ],
// };

export const getTimeString = (time) =>
	('00' + Math.floor(time / 60000)).slice(-2) + ':' + ('00' + Math.floor((time / 1000) % 60)).slice(-2);

export const sumUpSets = (workoutData) => {
	let sum = 0;

	Object.keys(workoutData).forEach((key) => {
		sum += workoutData[key].reduce((a, b) => (b.Complete ? a + 1 : a + 0), 0);
	});

	return sum;
};

export const sumUpWeight = (workoutData) => {
	let sum = 0;

	Object.keys(workoutData).forEach((key) => {
		sum += workoutData[key].reduce((a, b) => a + b.Gewicht * b.Wiederholungen, 0);
	});

	return sum;
};
