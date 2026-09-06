// Problem 7: Check if a String is a Palindrome

// civic ==> civic
// dad ==> dad
// madam ==> madam

// without function
let str = 'madam';
// let str = 'bangladesh';
let reverseStr = '';

for (let i = str.length - 1; i >= 0; i--) {
    let letter = str[i];
    reverseStr += letter;
}

console.log(reverseStr);

if (str === reverseStr) {
    console.log('Palindrome');
} else {
    console.log('Not Palindrome');
};



// with function

function isPalindrome(str) {
    let reverseStr = '';

    for (let i = str.length - 1; i >= 0; i--) {
        let letter = str[i];
        reverseStr += letter;
    }

    console.log(reverseStr);

    if (str === reverseStr) {
        return true;
    } else {
        return false;
    };
}

console.log(isPalindrome(str));
console.log(isPalindrome("write"));
console.log(isPalindrome("dad"));