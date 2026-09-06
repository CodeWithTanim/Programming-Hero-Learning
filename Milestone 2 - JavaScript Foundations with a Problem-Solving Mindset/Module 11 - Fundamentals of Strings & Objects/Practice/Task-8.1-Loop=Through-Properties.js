// Task 8.1 — Loop Through Properties
// let scores = { math: 90, science: 85, art: 95 };
// Use a for...in loop to log each key and value like: math: 90.
// Calculate the average of all values in the loop.


let scores = { 
    math: 90, 
    science: 85, 
    art: 95
};

let total = 0;
let count = 0;

for (let subject in scores) {
    console.log(subject + ': ', + scores[subject]);
    total += scores[subject];
    count++;
}

let average = total / count;

console.log("Average: ", average);