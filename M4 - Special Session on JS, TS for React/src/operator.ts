// Logical && Operator

let age = 20
let hasID = true;

if (age >= 18 && hasID) {
    console.log('You can enter');
} else {
    console.log("You can't enter");
}

// const username = 'Babul'
const username = undefined

if (username) {
    console.log(username);
} else {
    console.log('Loading...');
}

const result = username && 'User name is ' + username
console.log(result);