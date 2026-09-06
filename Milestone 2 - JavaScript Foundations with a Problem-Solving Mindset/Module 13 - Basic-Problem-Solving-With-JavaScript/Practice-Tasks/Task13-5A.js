// Input: a string
// Output: true or false
// Returns: a boolean

function isPalindrome(str) {
    // TODO: reverse the string and compare it to the original
    let reversed = "";

    for (let i = str.length - 1; i >= 0; i--) {
        reversed += str[i];
    }

    return str === reversed;
}

console.log(isPalindrome("level")); // Expected: true
console.log(isPalindrome("hello")); // Expected: false
