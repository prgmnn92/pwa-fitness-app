export const convertObjectForExerciseBox = (object) => {
  let newArray = [];

  newArray = Object.keys(object).map((key) => {
    let name = key;
    let completedSets = 0;

    let openSets = object[key].length;

    for (let i = 0; i < openSets; i++) {
      if (object[key][i]["Complete"]) {
        completedSets += 1;
      }
    }

    return {
      name,
      openSets,
      completedSets,
    };
  });

  return newArray;
};
