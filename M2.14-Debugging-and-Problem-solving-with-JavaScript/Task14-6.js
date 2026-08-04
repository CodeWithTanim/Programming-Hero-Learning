// Bug: explain this line out loud — what does str.length actually equal for ""?

// Bug: It's was assign a value instead of compare

function isEmpty(str) {
    if (str.length === 0) { // find the bug
        return true;
    } else {
        return false;
    }
}

console.log(isEmpty(""));  // Expected: true
console.log(isEmpty("hi")); // Expected: false
