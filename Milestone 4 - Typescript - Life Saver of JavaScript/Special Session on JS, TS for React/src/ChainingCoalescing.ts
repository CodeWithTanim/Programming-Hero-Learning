// Optional Chaining

// const user = {
//     name: 'Kabul',
//     city: 'Mirpur',
// }

const user = null;

console.log(user?.city);
console.log(user?.name);



// Nullish Coalescing       (null / undefined)

// const username = undefined
const username = 'Tanim'

console.log(username && 'Loading...');