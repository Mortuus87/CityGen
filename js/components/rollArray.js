/**
 * 
 * @param {array} qualities Array to pick a random one from. 
 * @param {number} iterations (optional) Number of values to extract.
 * @return {array} Returns an single value, or an array if iterations is set.
 */
export default function (qualities, iterations = 1) {

  let returnArray = [];

  for (let i = 0; i < iterations; i++) {
    let random = Math.floor(Math.random() * qualities.length);
    returnArray.push(qualities.splice(random, 1)[0]);
    // console.log(returnArray);
  };

  return returnArray;
}