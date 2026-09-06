// Problem 15: Return All Even Numbers, Then Their Sum

let arr = [10, 20, 50, 150, 6, 7, 9, 11, 23];


// without function
let evenNumbers = [];

for (let i = 0; i < arr.length; i++) {
    if (arr[i] % 2 === 0) {
        console.log(arr[i]);
        evenNumbers.push(arr[i]);
    }
}

console.log(evenNumbers);
sum = 0;

for (let key of evenNumbers) {
    console.log(key);
    sum += key;
}

console.log("Sum:", sum);

console.log();
console.log();
// with function

function getEvenNumbers (arr) {
    let evenNumbers = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] % 2 === 0) {
            evenNumbers.push(arr[i]);
        }
    }
    return evenNumbers;
}

console.log(getEvenNumbers(arr));

function getSum (arr) {
    let sum = 0;
    for (let key of arr) {
        console.log(key);
        sum += key;
    }
    return sum;
}

let evenNumberss = getEvenNumbers(arr);
let sums = getSum(evenNumberss)
console.log("Sum: ", sums);

