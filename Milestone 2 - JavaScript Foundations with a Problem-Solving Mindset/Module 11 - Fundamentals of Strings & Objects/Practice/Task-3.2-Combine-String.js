// Task 3.2 — Combine Strings
// Use .concat() to join "Hello" and "World" into "Hello World".
// Use + and template literals to do the same thing. Compare all three approaches.

let text1 = "Hello";
let text2 = "World";

console.log(text1.concat(" ", text2));

console.log(text1 + " " + text2);

console.log(`${text1} ${text2}`);
