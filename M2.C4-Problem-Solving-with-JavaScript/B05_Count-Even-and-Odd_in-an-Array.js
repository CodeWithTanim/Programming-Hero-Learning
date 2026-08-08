function countEvenOdd(arr) {
    if (!Array.isArray(arr)) {
        return "Invalid";
    }

    let result = {
        even: 0,
        odd: 0
    };

    for (let i = 0; i < arr.length; i++) {
        if (typeof arr[i] !== "number") {
            return "Invalid";
        }

        if (arr[i] % 2 === 0) {
            result.even++;
        } else {
            result.odd++;
        }
    }

    return result;
}

console.log(countEvenOdd([1, 2, 3, 4, 5]));