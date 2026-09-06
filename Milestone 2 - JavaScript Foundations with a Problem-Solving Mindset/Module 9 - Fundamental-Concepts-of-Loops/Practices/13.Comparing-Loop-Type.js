// Write the same task — printing numbers 1 to 5 — three times: once using for, once using while, and once using do while. Compare how the code structure differs for each.

// For Loop Version
console.log("For Loop")
for (i = 1; i <= 5; i++){
    console.log(i);
}

// While Loop Version
console.log("While Loop")
let j = 1;

while(j <= 5){
    console.log(j);
    j++;
}

// do-while Loop Version
console.log("Do-While Loop")
let k = 1;

do {
    console.log(k);
    k++;
} while (k <= 5);