/**
 * Retrieve one or more values from an array.
 *
 * @param {array} array Array to pick a random one from.
 * @param {number} iterations (optional) Number of values to extract.
 * @return {array} Returns resulting array.
 */
export default function (array, iterations = 1) {
  if (Array.isArray(array)) {
    array = shuffle(array);

    let returnArray = [];

    for (let i = 0; i < iterations; i++) {
      returnArray.push(array.pop());
    }

    return returnArray;
  }
}

/**
 * Welcome to string-along hell!
 *
 * This monstrosity will "randomize" the order of an array.
 *
 * @param {*} array
 * @returns
 */
function shuffle(array) {
  return array.map(a => ({sort: Math.random(), value: a })).sort((a, b) => a.sort - b.sort).map(a => a.value);
}