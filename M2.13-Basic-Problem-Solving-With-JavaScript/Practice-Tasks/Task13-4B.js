// Input: a string
// Output: the string without its first and last character
// Returns: a string

function removeFirstAndLast(str) {
    // TODO: slice out the middle portion of the string
    return str.slice(1, -1);

}

console.log(removeFirstAndLast("hello")); // Expected: "ell"
console.log(removeFirstAndLast("Bangladesht")); // Expected: "ell"
