// Task 1:

let fruits = ["Mango", "Banana", "Jackfruit"];
console.log(fruits);

// Task 2:
console.log(fruits.length);

// Task 3:
console.log(fruits[0]);
console.log(fruits[2]);

// Task 4:
fruits[1] = "Orange";
console.log(fruits);

// Task 5:
fruits.push("Litchi");
console.log(fruits);

// Task 6:
let removedLast = fruits.pop();
console.log(fruits);
console.log(removedLast);

// Task 7:
fruits.unshift("Guava");
console.log(fruits);

// Task 8:
let removedFirst = fruits.shift();
console.log(fruits);
console.log(removedFirst);

// Task 9:
console.log(fruits.includes("Strawberry"));
console.log(fruits.includes("Mango"));

// Task 10:
console.log(fruits.indexOf("Mango"));

// Task 11:
for (let i = 0; i < fruits.length; i++) {
    console.log(fruits[i]);
}

// Task 12:
let i = 0;
while (i < fruits.length) {
    console.log(fruits[i]);
    i++;
}