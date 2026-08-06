// Scope --> Global Scope, Block Scope, function Scope


// Global Scope

let something = "Test";
var something2 = "Test";
const something3 = "Test";

console.log(something, something2, something3);



// Block Scope

if (true) {
    let something = "Test";
    var something2 = "Test";
    const something3 = "Test";
}

console.log(something2); // var can work even its out of block scope.
console.log(something, something2, something3);


// Function Scope
function test() {
    let something = "Test";
    var something2 = "Test";
    const something3 = "Test";
};

console.log(something, something2, something3); // Nothing will work here.



var age = 25;
var age = 32;

console.log(age);


let age = 25; // will not work


// Hoisting

console.log(name); // Undefined
let name = "Tanim";
console.log(name); // it will work



