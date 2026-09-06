// make a function, it take an array as parameter and return the even array

// [1, 2, 3, 4, 5, 6, 7, 8]
// [2, 4, 6, 8]

const arr = [1, 2, 3, 4, 5, 6, 7, 8];
let evenArr = [];

for (let i = 0; i < arr.length; i++) {
    const val = arr[i];
    console.log(i, val);
    if (val % 2 === 0) {
        evenArr.push(val)
    }
}

console.log(evenArr, "Even arr");


function evenArray(arr) {
    let updatedArr = [];
    for (let i = 0; i < arr.length; i++) {
        const val = arr[i];
        // console.log(i, val);
        if (val % 2 === 0) {
            updatedArr.push(val)
        }
    }
    return updatedArr;
};

const arr1 = [1, 2, 3, 4, 5, 6, 7, 8];
const arr2 = [50, 34, 56, 31, 55, 33, 223];

const arr1Even = evenArray(arr1, );
const arr2Even = evenArray(arr2, );

console.log(arr1Even, "Array 1");
console.log(arr2Even, "Array 2");

