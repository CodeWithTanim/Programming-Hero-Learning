// Task 1.1 — Spot the Difference
// let str = "hello";
// let arr = ["h", "e", "l", "l", "o"];
// Log str.length and arr.length. What do you notice?
// Try str[0] and arr[0]. Do both work the same way?
// Try str.push("!") — what happens? Why does this fail for strings but not arrays?


let str = "hello";
let arr = ["h", "e", "l", "l", "o"];

console.log(str.length);
console.log(arr.length);

console.log(str[0]);
console.log(arr[0]);

// str.push("!") // Error
arr.push("!");
console.log(arr);