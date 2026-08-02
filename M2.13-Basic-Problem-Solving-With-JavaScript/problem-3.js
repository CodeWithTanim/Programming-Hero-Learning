// Problem 3: Factorial of a Number

let number = 5;
let result = 1;
// Without Function
for (let i = 1; i <= number; i++) {
    result *= i;
}
console.log("Factorial: ", result);

// With Function
function factorialCount (number) {
    let result = 1;
    for (let i = 1; i <= number; i++) {
        result *= i;
    }
    return result;
}

console.log("Factorial ==> ", factorialCount(5));
console.log("Factorial ==> ", factorialCount(4));
console.log("Factorial ==> ", factorialCount(7));

let factorialOfNine = factorialCount(9);
console.log("Factorial of 9: ", factorialOfNine);