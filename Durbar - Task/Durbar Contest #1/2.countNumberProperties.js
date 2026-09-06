function countNumberProperties(numbers) {
    // TODO: Implement this function
    
    let oddNumbers = 0;
    let evenNumbers = 0;
    let positiveNumbers = 0;
    let negativeNumbers = 0;

    for (const num of numbers) {
        if (num % 2 === 0) {
            evenNumbers++;
        } else {
            oddNumbers++;
        }

        if (num > 0) {
            positiveNumbers++;
        } else if (num < 0) {
            negativeNumbers++;
        }
    }

    return {
        even: evenNumbers,
        odd: oddNumbers,
        positive: positiveNumbers,
        negative: negativeNumbers
    };
}

// console.log(countNumberProperties([-5, 0, 3, -4, 1]));
// console.log(countNumberProperties([2, 4, 6, 8, 10]));
// console.log(countNumberProperties([-1, -2, -3, -4, -5]));
// console.log(countNumberProperties([1, 3, 5, 7, 9]));
// console.log(countNumberProperties([0, 0, 0, 0, 0]));
// console.log(countNumberProperties([1, -1, 0, 2, -2]));
// console.log(countNumberProperties([10, -10, 20, -20, 0]));
// console.log(countNumberProperties([-7, 8, -9, 10, 11]));