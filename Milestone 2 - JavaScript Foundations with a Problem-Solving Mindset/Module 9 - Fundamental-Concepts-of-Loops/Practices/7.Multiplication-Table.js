// Ask the user for a number (or set a variable), then print its multiplication table from 1 to 10 using a for loop. Example: if the number is 7 → 7 x 1 = 7, 7 x 2 = 14, ... 7 x 10 = 70.

let number = 7;
for (let i = 1; i <= 10; i++){
    console.log(number, "X", i, " = ", i*number);
}