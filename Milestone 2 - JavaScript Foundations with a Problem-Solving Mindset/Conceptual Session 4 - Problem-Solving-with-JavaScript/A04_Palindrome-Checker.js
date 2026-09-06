function isPalindrome(str) {
    if (typeof str !== 'string') {
        return "Invalid";
    };

    let reversed = str.split("").reverse().join("");

    if (str === reversed) {
        return true;
    } else {
        return false;
    };
};


console.log(isPalindrome("madam"));
console.log(isPalindrome("hero"));