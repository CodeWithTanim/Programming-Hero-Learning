function findLongestWord(sentence) {
    // TODO: Implement this function
    
    let longest = "";
    let currentWord = "";

    for (let i = 0; i < sentence.length; i++) {
        const char = sentence[i];

        const isLetter = (char >= "a" && char <= "z") || char >= "A" && char <= "Z";
        const isNumber = char >= "0" && char <= "9";

        if (isLetter || isNumber) {
            currentWord += char;
        } else {
            if (currentWord.length > longest.length) {
                longest = currentWord;
            }
            currentWord = "";
        }
    }

    if (currentWord.length > longest.length) {
        longest = currentWord;
    };
    return longest;
}

console.log(findLongestWord("The quick brown fox jumped over the lazy dog")); // "jumped"
console.log(findLongestWord("Hello world, how are you today?"));             // "Hello"
console.log(findLongestWord(""));                                             // ""
console.log(findLongestWord("!!! ,,, ???"));                                  // ""
console.log(findLongestWord("abc123 de"));                                    // "abc123"
console.log(findLongestWord("cat dog owl"));                                  // "cat"