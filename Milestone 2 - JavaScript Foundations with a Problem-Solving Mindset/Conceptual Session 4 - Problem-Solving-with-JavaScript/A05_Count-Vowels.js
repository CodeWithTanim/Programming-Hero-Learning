function countVowels(str) {
    if (typeof str !== 'string') {
        return "Invalid";
    };

    let text = str.toLowerCase();
    let vowels = 'aeiou';
    let count = 0;

    for (let i = 0; i < text.length; i++) {
        if (vowels.includes(text[i])) {
            count++;
        };
    };

    return count;
};

console.log(countVowels("Hello World"));
console.log(countVowels("Tanim"));