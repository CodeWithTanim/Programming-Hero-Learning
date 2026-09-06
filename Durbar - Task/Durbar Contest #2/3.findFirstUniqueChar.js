function findFirstUniqueChar(s) {
    // TODO: Implement this function
    const freq = {};

    for (const char of s) {
        freq[char] = (freq[char] || 0) + 1;
    }

    for (const char of s) {
        if (freq[char] === 1) {
            return char;
        }
    }

    return -1;
};


console.log(findFirstUniqueChar("aabbcdeff")); // "c"
console.log(findFirstUniqueChar("aabb"));      // -1
console.log(findFirstUniqueChar(""));          // -1
console.log(findFirstUniqueChar("abcd"));      // "a"
console.log(findFirstUniqueChar("z"));         // "z"
console.log(findFirstUniqueChar("aabbccz"));   // "z"