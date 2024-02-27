export default function getRandomArrayElement(array: any[]) {
  return array[Math.floor(Math.random() * array.length)];
}
