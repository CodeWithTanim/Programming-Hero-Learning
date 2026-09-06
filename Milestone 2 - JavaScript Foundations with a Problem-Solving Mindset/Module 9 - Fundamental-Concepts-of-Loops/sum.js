// 1, 2, 3, 4, 5
// 3
// 6
// 10
// 15

/**
 * sum = 0
 * sum = 3
 * sum = 6
 * sum = 10
 * sum = 15
*/

// step-1: show 1 to 10 numbers
let sum = 0;

for (let i = 1; i <= 10; i++){
    sum = sum + i;
    console.log(i, sum);
}