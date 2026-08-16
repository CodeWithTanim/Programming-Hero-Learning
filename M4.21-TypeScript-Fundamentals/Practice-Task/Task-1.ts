// Task 1: একটি function বানাও যা একটি user-এর নাম আর বয়স নিয়ে sentence print করবে।

function printSentence(name: string, age: number): string {
    return `${name} is ${age} years old.`
};


console.log(printSentence('Amina', 22));



// Task 2: একটি product-এর নাম, price, এবং availability store করো primitive types use করে।
let name: string = "Laptop";
let price: number = 45000;
let isAvailable: boolean = true;
console.log(`${name} cost ${price} and is available:${isAvailable}`);



// Task 3: একটি array বানাও যেখানে student-এর নাম থাকবে এবং কতজন আছে সেটা কনসোল করবে।
const students: string[] = ["Amina", "Rahim", "Karim", "Salma", "Rafi"];

console.log(`Total Students: ${students.length}`);



// Task 4: একটি tuple বানাও যেখানে একজন মানুষের নাম আর বয়স থাকবে।
const person: [string, number] = ['Amina', 22];

console.log(`${person[0]} is ${person[1]} years old.`);



// Task 5: একটি user object বানাও যেখানে name required, কিন্তু email optional।
const user: {
    userName: string;
    userEmail?: string;
} = {
    userName: 'Amina'
};

console.log(`Name: ${user.userName}, Email: ${user.userEmail ?? "Not Provided"}`);



// Task 6: একটি function লেখো যা একটি number নিয়ে check করবে সেটা even কি না।
function isEven(num: number): boolean {
    return num % 2 === 0;
};

console.log(isEven(8));



// Task 7: একটি function বানাও যা যেকোনো সংখ্যক number নিয়ে তাদের sum করবে।
function sumAll(...numbers: number[]): number {
    return numbers.reduce((sum, num) => sum + num, 0);
};

console.log(sumAll(1, 2, 3, 4));



// Task 8: দুইটি array merge করো spread operator ব্যবহার করে।
const arr1: number[] = [1, 2, 3];
const arr2: number[] = [4, 5, 6];

const merged = [...arr1, ...arr2];
console.log(merged);



// Task 9: একটি number positive না negative তা ternary operator দিয়ে বের করো।
const num: number = 5;

const result = num >= 0 ? "Positive" : "Negative";

console.log(result);



// Task 10: একটি variable undefined হলে default value print করো।
const username: string | undefined = undefined;
console.log(username ?? "Guest");



// Task 11: একটি unknown type variable declare করো এবং পরে type check করে string হলে print করো।
const value: unknown = "Hello";

if (typeof value === 'string') {
    console.log(value);
};



// Task 12: একটি TypeScript program বানাও যেখানে একজন user-এর নাম, বয়স, email, skills, আর active status থাকবে। এরপর সব তথ্য print করবে।
const userInfo : {
    name: 'string',
    age: number,
    email: string,
    skills: string[],
    active: boolean,
} = {
    name: "Amina",
    age: 22,
    email: "amina@email.com",
    skills: ["HTML", "CSS", "TypeScript"],
    active: true
};

console.log(`Name: ${userInfo.name}`);
console.log(`Age: ${userInfo.age}`);
console.log(`Email: ${userInfo.email}`);
console.log(`Skills: ${userInfo.skills.join(", ")}`);
console.log(`Active: ${userInfo.active}`);

