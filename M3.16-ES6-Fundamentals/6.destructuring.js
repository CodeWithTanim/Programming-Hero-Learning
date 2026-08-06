

// Destructuring for Array

const numbers = [10, 20, 30, 40, 50]
// const ten = numbers[1];
// const twenty = numbers[2];

// console.log(numbers[0]);
// console.log(numbers[1]);
// console.log(numbers[2]);

// console.log(ten, twenty);

const [ten, twenty, , , fifty] = numbers;

console.log(ten, twenty, fifty);


// Destructuring for Object

const student = {
    name: "Tanim",
    roll: 93457,
    age: 24,
    marks: {
        physics: 86,
        chemistry: 87,
        math: 55,
    }
};

console.log(student.name, student.age);

// const name = student.name;
// const roll = student.roll;
// console.log(name, roll);

// const {name, age} = student;
// console.log(name, age);

const {name:fullName, roll} = student;
console.log(fullName, roll);

const math = student.marks.math;
console.log(math);


// const {marks} = student;
const {marks: {physics}} = student;
console.log(physics);