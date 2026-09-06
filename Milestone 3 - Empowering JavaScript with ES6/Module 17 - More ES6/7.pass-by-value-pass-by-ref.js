

// Pass by Value (Premitive Data Type)
let name = "Tanim";
let age = 24;

function myFunc(myName, myAge) {
    myName = "Samiur";
    myAge = 23;
    console.log(myName, myAge);   
};

myFunc(name, age);
console.log(name, age);

// Pass by Reference (Referencial Data Type)
let student = {
    name: "Tanim",
    roll: 212,
};

function myFunc2 (data) {
    // data.name = "Samiur Rahman",
    data = {name: 'Samiur Rahman', Roll: '0212'};       // will not change if we replace data, make new memory address
    console.log(data);
};

myFunc2(student);
console.log(student);

