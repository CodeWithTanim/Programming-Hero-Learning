// make a function take an array and return the average number;
const arr = [1, 2, 3, 4, 6, 7, 8];

let sum = 0;
for (let i = 0; i < arr.length; i++) {
  let val = arr[i];
  sum += val;
}
let length = arr.length;
let average = sum / length;
console.log(average.toFixed(2));

function getAvg(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    let val = arr[i];
    sum += val;
  }
  let length = arr.length;
  let average = sum / length;
  return Number(average.toFixed(2));
}

const arr1 = [2, 3, 4];
const arr2 = [1, 2, 3, 4, 6, 7, 8];

const avg1 = getAvg(arr1);
const avg2 = getAvg(arr2);

console.log('Avg of array 1->', typeof avg1);
console.log('Avg of array 2->', avg2);