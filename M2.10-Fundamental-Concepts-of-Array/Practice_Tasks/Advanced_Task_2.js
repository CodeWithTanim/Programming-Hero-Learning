let mixedData = [23, "Apple", "Banana", 10, "Mango", 40];

let numbers = [];
let strings = [];

for (let i = 0; i < mixedData.length; i++) {
    if (typeof mixedData[i] === "number"){
        numbers.push(mixedData[i]);
    } else {
        strings.push(mixedData[i]);
    }
}

console.log(numbers);
console.log(strings);
