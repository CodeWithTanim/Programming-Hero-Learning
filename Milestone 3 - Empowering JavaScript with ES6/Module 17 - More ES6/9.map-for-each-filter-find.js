// map()

let numbers = [2, 4, 6, 8, 10];

let double = [];

for (let i = 0; i < numbers.length; i++) {
    double.push(numbers[i] * 2);
};

console.log(double);



const doubled = numbers.map(function (elem) {
    // console.log(elem * 2);
    return elem * 2;
});

console.log(doubled);


// Array Fucntion
const doubled2 = numbers.map((elem) => elem * 2);

console.log(doubled2);




// forEach()    ---> loop

let rolls = [10, 12, 24, 30];

rolls.forEach((elem, ind, arr) => {
    console.log(elem, ind, arr);
});


// filter()

let price = [100, 200, 300, 400, 500, 600];

let expensiveProducts = price.filter((elem) => {
    console.log(elem);
    if (elem >= 500) {
        return true;
    };
    return false;
});

console.log(expensiveProducts);

// shortcut:

// let expensiveProducts2 = price.filter((elem) => {
//     return elem >= 500;
// });
// console.log(expensiveProducts2);

let expensiveProducts2 = price.filter((elem) => elem >= 500);
console.log(expensiveProducts2);


// find()
let price2 = [100, 200, 300, 400, 501, 500, 600];

let expensiveProduct = price2.find((elem) => elem >= 500);
console.log(expensiveProduct);




// ==============================================

let phones = [
    {
        model: "iPhone 15",
        price: 72000
    },
    {
        model: "iPhone 16",
        price: 82000
    },
    {
        model: "iPhone 17",
        price: 92000
    },
    {
        model: "S25 Ultra",
        price: 92000
    },
    {
        model: "Techno",
        price: 15000
    },
    {
        model: "A07",
        price: 17000
    },
];

// expensive phones: >= 50000
// Chepese Phones: <=20000

let expensvePhones = phones.filter(phones => phones.price >= 50000)

console.log(expensvePhones);

let chepeastPhones = phones.filter(phones => phones.price <= 20000)

console.log(chepeastPhones);


let students = [
    {
        name: "Samiur",
        roll: 212
    },
    {
        name: "Tanim",
        roll: 213
    },
];

const findSpecidicStudent = students.find(students => students.name === "Tanim");
console.log(findSpecidicStudent);

