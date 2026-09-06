// Variable declaration process:

// 1. Keywork: var, let, const
// 2. Name
// 3. Assignment Operator
// 4. Value
// 5. Semi Colon

var firstName = "Kamal";
console.log(firstName);

var examNumber = 80;
console.log(examNumber);

// let / const 

let animalName = "elephant";
const age = 23;

console.log(animalName);
console.log(age);
console.log(animalName, age, firstName);

// var => redecleare and Reassign possible
var examNumber = 90;

console.log(examNumber);
examNumber = 45;
console.log(examNumber);

// let => redeclare not possible but reassign possible

let lastName = "Tanim"
console.log(lastName);
// let lastName = "Another";
// console.log(lastName);
lastName = "Samiur";
console.log(lastName);

// const = redeclear and reassign not possible
const language = "Bangla";
console.log(language);
// const language = "English";
// console.log(language);
// language = "Chineese"
// console.log(language);



// Nameing Convention:
/**
 * 1. do not start with a number, _, $
 * let 1name = "";
 * 2. do not use any reserve keyword
 * let const = "";
 * 3. do not use space or hypen
 * let first name = "";
 * let first-name = "";
*/

// Camel Case, Pascel Case, Snack Case
let hisFirstName = "Kamal"; // Camel Case
let HisFirstName = "Jamal"; // Pascel Case
let his_first_name = "Anik" // Snack Case


