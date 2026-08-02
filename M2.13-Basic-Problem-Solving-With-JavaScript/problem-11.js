// Problem 11: Sum and Average of an Array

let arr = [1, 2, 5, 10];


// without function
let sum = 0;

for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
    sum += arr[i];
}

console.log("Sum: ", sum);
let avg = sum / arr.length;
console.log("Average: ", avg);

// with function

function generateAvg(arr) {
    let sum = 0;

    for (let i = 0; i < arr.length; i++) {
        // console.log(arr[i]);
        sum += arr[i];
    }
    let avg = sum / arr.length;
    // return sum;
    return avg;
}

console.log(generateAvg([34, 45, 23, 44]));
console.log(generateAvg([1, 2, 3]));
console.log(generateAvg([10, 10, 10]));