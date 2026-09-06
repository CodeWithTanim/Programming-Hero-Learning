function checkMathOperationsForNine(a, b) {
    // TODO: Implement this function

    const sum = a + b;
    const sub = a - b;
    const multi = a * b;
    const devided = a / b;

    if (sum === 9 || sub === 9 || multi === 9 || devided === 9) {
        return 'Nine'
    } else {
        return 'Nein'
    };
};

console.log(checkMathOperationsForNine(5, 4));
console.log(checkMathOperationsForNine(10, 1));
console.log(checkMathOperationsForNine(3, 3));
console.log(checkMathOperationsForNine(18, 2));
console.log(checkMathOperationsForNine(10, 2));