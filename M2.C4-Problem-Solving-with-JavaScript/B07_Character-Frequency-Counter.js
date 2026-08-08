function charFrequency(str) {
    if (typeof str !== "string") {
        return "Invalid";
    }

    let result = {};

    for (let i = 0; i < str.length; i++) {
        let character = str[i];

        if (result[character]) {
            result[character]++;
        } else {
            result[character] = 1;
        }
    }

    return result;
}

console.log(charFrequency("hero"));
console.log(charFrequency("hello"));