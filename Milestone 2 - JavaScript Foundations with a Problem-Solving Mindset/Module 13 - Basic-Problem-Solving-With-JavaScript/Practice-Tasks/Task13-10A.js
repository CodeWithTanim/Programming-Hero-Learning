// Input: a number
// Output: true or false
// Returns: a boolean

function isPerfectSquare(num) {
    let squareRoot = Math.sqrt(num);

    return squareRoot === Math.floor(squareRoot);
}

console.log(isPerfectSquare(16)); // true
console.log(isPerfectSquare(20)); // false