const numbers = [12, 87, 34, 56, 23, 86];

/**
 * 1. loop through the array to get each element
 * 2. identify even numbers
 * 
 * 
 * 
*/

const evens = [];
for (const num of numbers) {
    console.log(num);
    // const evens = [];
    if (num % 2 === 0){
        console.log('even', num);
        evens.push(num);
    }
}

function getEvenNumbers (array) {
    const evens = [];
    for ( const num of array ) {
        if (num % 2 === 0) {
            evens.push(num);
            // return evens;
        }
    }
    return evens;
}

const result = getEvenNumbers(numbers);
console.log('result: ', result);