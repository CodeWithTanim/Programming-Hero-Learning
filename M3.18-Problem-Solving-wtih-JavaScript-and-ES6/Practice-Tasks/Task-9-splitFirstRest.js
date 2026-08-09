function splitFirstRest (arr) {
    const [first, ...rest] = arr;

    return {
        first,
        rest
    };
};


console.log(splitFirstRest([10, 20, 30, 40]));