// reverse a string "Hero" ==> "oreH"

const str = "Hero";

let reverseStr = '';

// for (let i = 0; i < str.length; i++) {
//     console.log(str[i]);
//     reverseStr = str[i] + reverseStr;
// }
// console.log(reverseStr);


// for (let i = str.length - 1; i >= 0; i--) {
//     reverseStr += str[i];

// }

// console.log(reverseStr);



let str3 = "Bangaldesh";
reverseStr3 = "";
let j = str3.length - 1;
while (j >= 0) {
    reverseStr3 += str3[j];
    j--;
}

console.log(reverseStr3);