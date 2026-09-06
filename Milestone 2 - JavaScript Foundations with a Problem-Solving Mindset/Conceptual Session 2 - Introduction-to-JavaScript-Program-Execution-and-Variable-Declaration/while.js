// console.log("Hello World!");
// console.log("Hello World!");
// console.log("Hello World!");
// console.log("Hello World!");
// console.log("Hello World!");

/**
 * Initializer
 * Condition
 * Increment or Decrement
*/

let i = 1; // Initializer 

// while (i < 10) { // 9 time because less than 10
while (i <= 10) {
    console.log("Hello World!");
    i++; // Increment
}

// Sum of 10 Number
//  1 + 2 + ... ... + 10;

let j = 1;
let sum = 0;

while (j <= 10 ) {
    sum += j;
    console.log(j, sum);
    j++;
}
console.log("Sum of 1 to 10: ",sum);


// Reverse Loop
// 10 + 9 + ... ... + 1;

let k = 10;

let revSum = 0;
while (k > 0) {
    console.log(k);
    revSum += k;
    k--;
}
console.log("Reverse Sum of 10 to 1: ", revSum);

let m = 0;

do {
    console.log("Hello");
    m++;
} while (m < 0);