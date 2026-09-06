// Input: an array of numbers
// Output: array with duplicates removed
// Returns: an array

function removeDuplicates(numbers) {
    let unique = [];

    for (let i = 0; i < numbers.length; i++) {
        if (!unique.includes(numbers[i])) {
            unique.push(numbers[i]);
        }
    }

    return unique;
}

console.log(removeDuplicates([1, 2, 2, 3, 4, 4, 5]));
// [1, 2, 3, 4, 5]