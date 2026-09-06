function mergeInventory (arr1, arr2) {
    if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
        return "Invalid";
    };
    return [...arr1, ...arr2];
};


function highestScore(scores) {
    if (!Array.isArray(scores)) {
        return "Invalid";
    };
    return Math.max(...scores);
};


console.log(mergeInventory([1 ,2], [3, 4]));
console.log(mergeInventory("2 , 6, 5"));
console.log(highestScore([1 ,2, 5, 8, 9, 3, 4]));
console.log(highestScore("3, 5, 6"));