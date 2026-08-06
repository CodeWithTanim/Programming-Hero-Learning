// Spread & Rest Operator

let numbers = [34, 45, 54, 32, 44, 77];

console.log(numbers);
console.log(34, 45, 54, 32, 44, 77);
console.log(...numbers);    // Spread

let student = {
    name: "Tanim",
    age: 24
}

// console.log(...student);

let maxNumbver = Math.max(45, 65,343,46456,3453);
let maxNumbver2 = Math.max(numbers); // NaN
let maxNumbve3 = Math.max(...numbers);

console.log(maxNumbver);
console.log(maxNumbver2);
console.log(maxNumbve3);



let numbers2 = numbers;

console.log(numbers2);

let numbers3 = [...numbers, 45, 333, 555];

numbers.push(2400);

console.log(numbers3);

console.log(numbers2);

let students = {
    name: "Tanim",
    age: 24
};

let students2 = {...students, GPA: "5.00"};
students.something = 'test';
console.log(students2);



// Rest Operator

function sum(a, b, c, ...restNumbers){
    console.log(restNumbers, "restNumbers")
    let sum = 0;
    for(let number of restNumbers) {
        sum += number;
    }
    return a + b + c + sum;
};

console.log(sum(10, 20, 30, 40, 50, 60));