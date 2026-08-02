// Input: an array of numbers
// Output: the average of all numbers
// Returns: a number

function averageOfArray(numbers) {
    let total = 0;
    // TODO: loop through, sum the numbers, then divide by the count
    for (let i = 0; i < numbers.length; i++) {
        total += numbers[i];
    }

    return total / numbers.length;
}


console.log(averageOfArray([2, 4, 6])); // Expected: 4
