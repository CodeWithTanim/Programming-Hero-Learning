// Task 6.1 — Dot vs Bracket Notation
// let car = { brand: "Toyota", model: "Corolla", year: 2022 };
// Get brand using dot notation.
// Get model using bracket notation.
// Add a new property color: "blue" using bracket notation.
// Update year to 2023 using dot notation.


let car = { brand: "Toyota", model: "Corolla", year: 2022 };

console.log(car.brand);
console.log(car['model']);

car['color'] = "blue";
console.log(car);

car.year = 2023;
console.log(car);