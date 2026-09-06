// Declare a string | number union variable. Cast it safely to number and add 10. Then write a double assertion (as unknown as) example and comment why it's risky.

let value: string | number = '100';

let num = Number(value);
console.log(num + 10);




// Double assertion risky because TypeScript trust on u, even when actual value may not match the asserted by us.
// let risky = value as unknown as boolena;

