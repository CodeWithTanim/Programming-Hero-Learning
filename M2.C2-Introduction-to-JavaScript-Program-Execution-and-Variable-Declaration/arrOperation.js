let arr = ["apple", "orange", 'guava', 'watermillon', 'mango', 'jackfruit'];


console.log(arr.indexOf("guava"));
console.log(arr.indexOf("watermillon"));
console.log(arr.indexOf("banan")); // -1 if its not in the array.

console.log(arr.includes("guava"));
console.log(arr.includes("Banana"));

if (arr.includes("Banana")) {
    console.log("Banana Exist");
} else {
    console.log("Banana Not Exist")
}


let a = [1, 2, 3];
let b = [4, 5, 6];

let c = a.concat(b);
let d = b.concat(a);
console.log(c);
console.log(d);


let joinedArr = c.join(" > ");
console.log(joinedArr, typeof joinedArr);


console.log(typeof c);

console.log(Array.isArray(c));
console.log(Array.isArray(joinedArr));

