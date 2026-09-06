/**
 * Two Data Type
 * 1. Premetive Data Type - string, number, boolean, undefined, numll
 * 2 Non-Premitive Data Type - function, object, array
 * 
 * 
*/

let name = "Tanim";
let age = 24;
let isMarried = true;
let universityResult = undefined;
let salary = null;

console.log(typeof name, typeof age, typeof isMarried, typeof universityResult, typeof salary);

let name2 = name;

console.log(name2);
name = "Samiur";
console.log(name2);


let student = {
    name: "Tanim",
};


let arr = [100, 200, 30];


function add (a, b) {
    return a + b;
};

console.log(typeof student, typeof arr, typeof add);

let student2 = student;

console.log(student2);

student.age = 24;

console.log(student2);


// Independent 
let arr2 = [...arr];