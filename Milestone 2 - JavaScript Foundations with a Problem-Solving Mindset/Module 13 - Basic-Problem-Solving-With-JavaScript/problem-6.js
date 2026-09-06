// Problem 6: Count Vowels in a String

// Vowels = A, E, I, O, U


// without function
let str = "Programming Hero";

let vowels = 'aeiou';


let count = 0;

for (let i = 0; i < str.length; i++) {
    let letter = str[i];
    console.log("i, -> letter ==> ", i, letter);
    if (vowels.includes(letter)) {
        console.log("Vowles");
        count++;
    }
}

console.log(count);

// with function

function countVowels(str) {
    let count = 0;
    let vowels = 'aeiou';

    for (let i = 0; i < str.length; i++) {
        let letter = str[i];
        console.log("i, -> letter ==> ", i, letter);
        if (vowels.includes(letter)) {
            console.log("Vowles");
            count++;
        }
    }
    return count;
}


console.log(countVowels("CodeWithTanim"));