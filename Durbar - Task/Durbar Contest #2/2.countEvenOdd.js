function countEvenOdd(numbers) {
    // TODO: Implement this function
    let even = 0;
    let odd = 0;

    for (const num of numbers) {
        if (num % 2 === 0) {
            even++;
        } else {
            odd++;
        }
    }

    return {even, odd};
};



console.log(countEvenOdd([1,2,3,4,5]));      // {even: 2, odd: 3}
console.log(countEvenOdd([10,20,30]));       // {even: 3, odd: 0}
console.log(countEvenOdd([]));               // {even: 0, odd: 0}
console.log(countEvenOdd([-4,-7,0]));        // {even: 2, odd: 1}
console.log(countEvenOdd([7]));              // {even: 0, odd: 1}