const numbers = [12, 45, 435, 67, 34, 78, 55];
const players = ['abul', 'babul', 'cabul', 'dabul', 'Kabul']
const numbers2 = [2, 3];

let hasItems = numbers.includes(45);
console.log(hasItems);

let hasItems1 = numbers.includes(6);
console.log(hasItems1);

if (numbers.includes(77)) {
    // Something
}

if (players.includes('messi')){
    console.log('Babul is playing');
}
if (players.includes('babul')){
    console.log('Babul is playing');
}
if (players.includes('Babul')){ // Not working because of case-sensetive
    console.log('Babul is playing');
}

const allNumbers = numbers.concat(numbers2);
console.log(allNumbers);

const numbs = [1, 3, 5, 2, 8];

const joined = numbs.join(', ');
console.log(joined);


const position = numbs.indexOf(5);
console.log('position of 5: ', position);
const position2 = numbs.indexOf(2);
console.log('position of 2: ', position2);
const position3 = numbs.indexOf(-3);
console.log('position of -3: ', position3);


console.log(typeof numbs);
console.log(Array.isArray(numbs));
console.log(Array.isArray(56));
console.log(Array.isArray([56]));