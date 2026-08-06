

const user = {
    name: "Tanim",
    age: 35,
    'my-address': "something",
    something: [20, 30, 40, 50],
    company: {
        name: "ExploitInject",
        address: {
            city: 'Pabna',
            zip: 6682,
        },
    },
};

// console.log(user);

// // Dot Notation & Bracket Notation

// console.log(user.age);

// const key = 'company';
// console.log(user[key]);

// // console.log(user.my-address);
// console.log(user['my-address']);



// Optional chaining

console.log(user.company.name, user.company.address.city);

const user2 = {
    name: "Habib",
    age: 35,
    'my-address': "something",
    something: [20, 30, 40, 50],
    // company: {
    //     name: "ExploitInject",
    //     address: {
    //         city: 'Pabna',
    //         zip: 6682,
    //     },
    // },
};


// console.log(user2.company.name, user2.company.address.city);
console.log(user2?.company?.name, user2?.company?.address?.city);


// Object Loop

// for (let element of user) {
// for (let element in user) {
for (let key in user) {
    console.log(key, user[key]);
}


const keys = Object.keys(user);
const values = Object.values(user);
const entries = Object.entries(user);


for (let key of keys) {
    console.log(key, user[key]);
};


for (let elem of entries) {
    const [key, value] = elem
    console.log(key, value)
};


