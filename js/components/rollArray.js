export default function (array) {
  let roll = Math.floor(Math.random() * array.length);
  return array[roll];
}