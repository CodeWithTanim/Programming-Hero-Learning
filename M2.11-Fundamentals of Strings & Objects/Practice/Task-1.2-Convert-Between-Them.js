// Task 1.2 — Convert Between Them
// Convert the string "JavaScript" into an array of characters.
// Convert the array ["c", "a", "t"] back into a single string "cat".


let str1 = "JavaScript";
let arr1 = ["c", "a", "t"];

let arr = str1.split("");
console.log(arr);

let str = arr1.join("");
console.log(str);