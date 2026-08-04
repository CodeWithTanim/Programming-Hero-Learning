// Apply the full debugging process to find this bug


// Bug: Loop Run Extra Time because of <=

function countVowels(str) {
    let vowels = "aeiou";
    let count = 0;

    for (let i = 0; i < str.length; i++) { // find the bug
        if (vowels.includes(str[i])) {
            count = count + 1;
        }
    }

    return count;
}

console.log(countVowels("orange")); // Expected: 3


