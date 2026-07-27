let numbers = [3, 5, 6, 7, 7, 4, 5, 23, 55, 66, 55, 99, 34];

let unique = [];

for (let i = 0; i < numbers.length; i++) {
    if (!unique.includes(numbers[i])) {
        unique.push(numbers[i])
    }
}

console.log(unique);