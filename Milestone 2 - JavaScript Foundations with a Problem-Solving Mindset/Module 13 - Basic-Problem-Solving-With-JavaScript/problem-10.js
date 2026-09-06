// Problem 10: Find the Smallest Number in an Array

// without function
let arr = [500, 120, 20, 5010, 1220];
let smallest = arr[0];

for (let i = 1; i < arr.length; i++) {
    let currentElement = arr[i];
    if (currentElement < smallest) {
        smallest = currentElement;
    }
    console.log("Current Element", currentElement);
}

console.log("smallest: ", smallest);

// with function
function smallestNumberFromArray(arr) {
    for (let i = 1; i < arr.length; i++) {
        let currentElement = arr[i];
        if (currentElement < smallest) {
            smallest = currentElement;
        }
        // console.log("Current Element", currentElement);
    }
    return smallest;
}

console.log("Smallest is Array: ", smallestNumberFromArray([34, 54, 344, 232, 451, 12]));