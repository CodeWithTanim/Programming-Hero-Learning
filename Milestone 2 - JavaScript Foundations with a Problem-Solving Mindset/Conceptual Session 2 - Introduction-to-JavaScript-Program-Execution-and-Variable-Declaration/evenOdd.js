// 1-10 even odd Number

// Odd: 
for (let i = 1; i <= 10; i += 2) {
    console.log(i);
}

// Even: 
for (let j = 2; j <= 10; j += 2) {
    console.log(j)
}

// If-Else:

for (let i = 1; i <= 10; i++) {
    if (i % 2 === 0) {
        console.log(i, "=> Even");
    } else {
        console.log(i, "=> Odd");
    }
}



for (let i = 1; i <= 10; i++) {
    if (i % 2 === 1) {
        console.log(i, "=> Odd");
    } else {
        console.log(i, "=> Even");
    }
}