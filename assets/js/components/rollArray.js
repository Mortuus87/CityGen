/**
 * Retrieve one or more values from an array.
 *
 * @param {array} array Array to pick a random one from.
 * @param {number} count (optional) Number of values to extract.
 * @return {array} Returns resulting array.
 */
export function roll(array, count = 1) {
  let results = [];
  if (Array.isArray(array) && array.length > 0) {
    let shuffledArray = shuffle(array);


    for (let i = 0; i < count; i++) {
      results.push(shuffledArray.pop());
    }
  }

  return results;
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
  return array.map(a => ({
    sort: Math.random(), value: a
  })).sort((a, b) => a.sort - b.sort).map(a => a.value);
}