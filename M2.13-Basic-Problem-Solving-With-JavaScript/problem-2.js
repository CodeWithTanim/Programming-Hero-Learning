// Problem 2: Sum of a Range of Numbers (1 to N)

// 7 ==> 1 + 2 + 3 + 4 + 5 + 6 + 7

let number = 7;
let sum = 0;

// Without Function
for (let i = 1; i <= number; i++) {
    console.log("i==> ", i);
    sum += i;
}
console.log("Sum: ", sum);

// With Function
function sumOfRange(number) {
    let sum = 0;
    for (let i = 1; i <= number; i++) {
        sum += i;
    }
    return sum;
}

console.log("Sum: ", sumOfRange(9));