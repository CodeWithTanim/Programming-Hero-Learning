// Input: a sentence (string)
// Output: sentence with word order reversed
// Returns: a string

function reverseWords(sentence) {
    return sentence.split(" ").reverse().join(" ");
}

console.log(reverseWords("hello world")); // "world hello"