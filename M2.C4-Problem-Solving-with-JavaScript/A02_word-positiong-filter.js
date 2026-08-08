
function filterEvenPositionWords(sentence) {
    if (typeof sentence != 'string') {
        return "Invalid";
    };

    let words = sentence.split(" ");
    let result = [];

    for (let i = 0; i < words.length; i++) {
        if (i % 2 === 0) {
            result.push(words[i]);
        };
    };

    return result.join(" ");
};

console.log(filterEvenPositionWords("The quick brown fox jumps"));