// Input: a sentence (string)
// Output: the shortest word
// Returns: a string

function findShortestWord(sentence) {
    let words = sentence.split(" ");
    let shortest = words[0];
    // TODO: loop through words and compare lengths

    for (let i = 0; i < words.length ; i++) {
        if (words[i].length < shortest.length) {
            shortest = words[i];
        }
    }

    return shortest;
}

console.log(findShortestWord("JavaScript is a fun language")); // Expected: "a"
