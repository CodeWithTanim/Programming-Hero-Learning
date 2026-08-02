// Problem 12: Filter Numbers Greater Than a Value

let arr = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

let value = 45;

// without function
let filterArray = [];

for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
    if (arr[i] > value) {
        filterArray.push(arr[i]);
    }
}
console.log(filterArray);


// with function
function filterNumber(arr, value) {
    let filterArray = [];
    for (let i = 0; i < arr.length; i++) {
        console.log(arr[i]);
        if (arr[i] > value) {
            filterArray.push(arr[i]);
        }
    }
    return filterArray;
}

console.log(filterNumber([10, 20, 30, 40, 50, 60, 70, 80, 90, 100], 26))