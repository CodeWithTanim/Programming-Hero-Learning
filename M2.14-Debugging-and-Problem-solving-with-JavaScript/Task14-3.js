// Bug: this loop never ends — find the missing piece

// Bug: i++ was not mentioned there

function countUpTo(n) {
    let count = 0;

    for (let i = 1; i <= n; i++) { // something is missing here
        count = count + 1;
    }

    return count;
}

console.log(countUpTo(5)); // Expected: 5 (currently freezes/never finishes)
console.log(countUpTo(60)); // Expected: 5 (currently freezes/never finishes)
