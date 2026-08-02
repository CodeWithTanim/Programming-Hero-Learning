// Problem 9: Find the Largest Number in an Array

// without function
let arr = [500, 120, 20, 5010, 1220];
let largest = arr[0];

for (let i = 1; i < arr.length; i++) {
    let currentElement = arr[i];
    if (currentElement > largest) {
        largest = currentElement;
    }
    console.log("Current Element", currentElement);
}

console.log("Largest: ", largest);

// with function
function largestNumberFromArray(arr) {
    for (let i = 1; i < arr.length; i++) {
        let currentElement = arr[i];
        if (currentElement > largest) {
            largest = currentElement;
        }
        // console.log("Current Element", currentElement);
    }
    return largest;
}

console.log("Largest in Array: ", largestNumberFromArray([45, 65,34,343,5645, 6565]));