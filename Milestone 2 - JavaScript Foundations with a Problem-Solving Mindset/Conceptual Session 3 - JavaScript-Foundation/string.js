const greet = "Hello World";

console.log(greet);

const studentName = `Kamal Uddin`;

console.log(studentName);

console.log(studentName.length);

console.log(studentName[0], 'String 0 index');
console.log(studentName[4], 'String 4 index');
console.log(studentName[7], 'String 7 index');
console.log(studentName[9], 'String 9 index');
console.log(studentName[10], 'String 10 index');


const arr1 = [2, 3, 4, 5, 6];

arr1[1] = 10;
console.log(arr1, "array after update");

// string modification
const fruitName = 'Jackfruit';

fruitName[1] = "e";
console.log(fruitName, "fruit after modify");