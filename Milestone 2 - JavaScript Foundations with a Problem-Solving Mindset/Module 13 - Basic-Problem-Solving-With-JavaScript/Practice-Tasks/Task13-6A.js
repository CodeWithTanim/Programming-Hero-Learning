// Input: an array of numbers
// Output: the second smallest number
// Returns: a number

function findSecondSmallest(numbers) {
    let smallest = Infinity;
    let secondSmallest = Infinity;
    // TODO: loop through and update smallest/secondSmallest correctly
    for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] < smallest) {
            secondSmallest = smallest;
            smallest = numbers[i];
        } else if (numbers[i] < secondSmallest && numbers[i] !== smallest) {
            secondSmallest = numbers[i];
        }
    }
    return secondSmallest;
}

console.log(findSecondSmallest([10, 5, 8, 20, 15])); // Expected: 8
