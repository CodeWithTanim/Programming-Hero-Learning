/**
 * 1 = 1
 * 2 = 1 * 2 = 2
 * 3 = 2 * 3 = 6
*/

let number = 3;
let fact = 1;

for (let i = 1; i <= number; i++) {
    fact *= i;
}

console.log(fact);

