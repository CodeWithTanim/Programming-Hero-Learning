// Problem 8: Count Words in a Sentence

// let arr = ['code', 'bangaldesh', 'Bogura'];

// console.log(arr.length);

// without function
let str = 'Programming Hero';
let strSplitArr = str.split(" ");
console.log(strSplitArr.length);

// with function
function wordCount(str) {
    let strSplitArr = str.split(" ");
    return strSplitArr.length;
}

console.log(wordCount("Bangladsh is a country"));