let numbers = [25, 8, 34, 54, 78, 23, 45];

let largest = numbers[0];
let smallest = numbers[0];

for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] > largest) {
        largest = numbers[i];
    }
    if (numbers[i] < smallest) {
        smallest = numbers[i];
    }
}

console.log("Largest: ", largest);
console.log("Smallest: ", smallest);