// Problem 5: Reverse a String

// let arr = [1, 2, 3];
// console.log(arr.reverse());

// without funtion

let str = 'programming';
let reverseWord = "";

// console.log(str[10]);

console.log("String Length: ", str.length);

for (let i = str.length - 1; i >= 0; i--) {
    let letter = str[i];
    console.log("i==> ", i, str[i]);
    reverseWord += letter;
}

console.log(reverseWord);

// with function

function reverseWords(words) {
    let reverseWordss = "";
    for (let i = words.length - 1; i >= 0; i--) {
        let letter = words[i];
        console.log("i==> ", i, letter);
        reverseWordss += letter;
    }
    return reverseWordss;
}

console.log(reverseWords("I Love Bangladesh"))