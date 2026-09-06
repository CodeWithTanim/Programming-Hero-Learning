// Input: an array of numbers
// Output: array with only even numbers
// Returns: an array

function keepEvenNumbers(numbers) {
    let result = [];
    // TODO: loop and push only even numbers
    for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] % 2 === 0) {
            result.push(numbers[i]);
        }
    }

    return result;
}

console.log(keepEvenNumbers([3, -5, 8, -1, 0])); // Expected: [8, 0]
