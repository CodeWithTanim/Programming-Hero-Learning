// Problem

function greet(name) {
    return `Hello, ${name}`;
};

console.log(greet("Tanim")); // Hello, Tanim
console.log(greet()); // Hello, Undefined



// Fix with Default Parameter

function greets(name = "Guest") {
    return `Hello, ${name}`;
};

console.log(greets("Tanim")); // Hello, Tanim
console.log(greets()); // Hello, Guest


// Problem
function makeCoffee(suger) {
    return `Coffee is prepared with ${suger} spoon suger`;
};

console.log(makeCoffee(3));
console.log(makeCoffee());


// Fix with default Parameter
function makeCoffees(suger = 1) {
    return `Coffee is prepared with ${suger} spoon suger`;
};

console.log(makeCoffees(3));
console.log(makeCoffees());