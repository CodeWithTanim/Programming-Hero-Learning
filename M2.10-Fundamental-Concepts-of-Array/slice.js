const numbers = [1, 3, 4, 67, 56, 32, 90];


const slice = numbers.slice(2, 6);
console.log(slice);
console.log(numbers);


// const parts = numbers.splice(2, 2);
const parts = numbers.splice(2, 2, 99, 555, 666, 8787, 2342);
console.log(parts);
console.log(numbers);
