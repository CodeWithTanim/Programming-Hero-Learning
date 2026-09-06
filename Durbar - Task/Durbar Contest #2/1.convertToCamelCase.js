function convertToCamelCase(sentence) {
    // TODO: Implement this function
    const words = sentence.split(" ").filter(word => word.length > 0);

    if (words.length === 0) {
        return "";
    }

    return words.map((word, index) => {
        const lower = word.toLowerCase();
        if (index === 0) return lower;
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }).join("");
}

// console.log(convertToCamelCase("hello world"));          // "helloWorld"
// console.log(convertToCamelCase("java script is fun"));   // "javaScriptIsFun"
// console.log(convertToCamelCase("  hello   world  "));    // "helloWorld"
// console.log(convertToCamelCase("HELLO WORLD"));           // "helloWorld"
// console.log(convertToCamelCase("a"));                     // "a"
// console.log(convertToCamelCase(""));                      // ""
// console.log(convertToCamelCase("   "));                   // ""