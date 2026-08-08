function reverseEachWord(sentence) {
    if (typeof sentence !== "string") {
        return "Invalid";
    }

    let words = sentence.split(" ");
    let result = [];

    for (let i = 0; i < words.length; i++) {
        let reversedWord = words[i].split("").reverse().join("");
        result.push(reversedWord);
    }

    return result.join(" ");
}

console.log(reverseEachWord("Hero is strong"));