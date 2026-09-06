const numbers = [34, 56, 34, 2, 3, 67];

console.log(numbers);
const reversed = numbers.reverse();
// console.log(reversed);
console.log(numbers);

const friends = ["Abul", "Babul", "Chabul", "Dabul"];
const afterReverse = [];

for (const friend of friends) {
    console.log(friend);
    afterReverse.unshift(friend);
    console.log(afterReverse);
}

const digits = [1, 2, 3, 4, 5, 6];

for (let i = 0; i < digits.length; i++) {
    console.log(i, digits[1]);
}

console.log();
const reverseDigits = [];
// Reverse for loop to get Array elements
for (let i = digits.length - 1; i >= 0; i--) {
    // console.log(i);
    console.log(i, digits[i]);
    reverseDigits.push(digits[i]);
}