let arr = [4, 5, 3, 6, 7, 8];


// arr.reverse();
// arr.sort();
arr.sort((a, b) => a - b);
arr.sort((a, b) => b - a);
console.log(arr);
