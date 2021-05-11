/**
 * 
 * @param {array} target Array to pick a random one from. 
 * @param {number} iterations (optional) Number of values to extract.
 * @return {array} Returns an single value, or an array if iterations is set.
 */
export default function (target, iterations = 1) {
  if (Array.isArray(target)) {
    target = shuffle(target);
    
    let returnArray = [];

    for (let i = 0; i < iterations; i++) {
      returnArray.push(target.pop());
    }
    
    return returnArray;
  }
}

function shuffle(array) {
  return array.map(a => ({sort: Math.random(), value: a })).sort((a, b) => a.sort - b.sort).map(a => a.value);
}