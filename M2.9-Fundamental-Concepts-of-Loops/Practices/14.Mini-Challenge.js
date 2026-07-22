// Write a program that:
// 1. Loops from 1 to 100.
// 2. Skips (continue) any number divisible by 5.
// 3. Stops (break) completely once it reaches a number greater than 40.
// 4. Prints every number that passes both checks.


for (i = 1; i <= 100; i++){
    if (i%5 === 0){
        continue;
    }
    if (i >= 40){
        break;
    }
    console.log(i);
}