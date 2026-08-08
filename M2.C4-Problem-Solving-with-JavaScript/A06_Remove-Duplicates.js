function removeDuplicates(arr) {
    if (!Array.isArray(arr)) {
        return "Invalid";
    };

    let result = [];

    for (let i = 0; i < arr.length; i++) {
        if (!result.includes(arr[i])) {
            result.push(arr[i]);
        };
    };

    return result;
};

console.log(removeDuplicates([1, 2, 2, 3, 4, 4, 5]));