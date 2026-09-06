// Bug: find why this doesn't return the first element

// Index Number wrond for the first index its 0;

function getFirstElement(arr) {
    return arr[0]; // find the bug
}

console.log(getFirstElement([10, 20, 30])); // Expected: 10 (currently returns 20)
