function runningTotal(amounts) {
    if (!Array.isArray(amounts)) {
        return "Invalid";
    }

    let result = [];
    let total = 0;

    for (let i = 0; i < amounts.length; i++) {
        if (typeof amounts[i] !== "number") {
            return "Invalid";
        }

        total = total + amounts[i];
        result.push(total);
    }

    return result;
}

console.log(runningTotal([100, 50, 25]));