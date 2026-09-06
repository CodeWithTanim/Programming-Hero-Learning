function isStrictMatch(input, target) {
    return input === target;
}

console.log(isStrictMatch("18", 18));
// false

console.log(isStrictMatch(18, 18));
// true