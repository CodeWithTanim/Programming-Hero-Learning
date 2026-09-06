function findSecondLargestUnique(numbers) {
    // TODO: Implement this function
    const unique = [];

    for (let i = 0; i < numbers.length; i++) {
        if (!unique.includes(numbers[i])) {
            unique.push(numbers[i]);
        }
    };

    if (unique.length < 2) {
        return null;
    };

    unique.sort((a, b) => b - a);

    return unique[1];
}

console.log(findSecondLargestUnique([10,5,20,5,15])); // 15
console.log(findSecondLargestUnique([3,3,3]));         // null
console.log(findSecondLargestUnique([]));              // null
console.log(findSecondLargestUnique([5]));             // null
console.log(findSecondLargestUnique([-5,-1,-10]));     // -5
console.log(findSecondLargestUnique([1,2]));           // 1