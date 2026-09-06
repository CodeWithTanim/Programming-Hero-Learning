function isOdd(number){
    if (number % 2 === 1){
        return true;
    } else {
        return false;
    }
}

const result = isOdd(78);
const result2 = isOdd(89);

console.log('is Odd: ', result);
console.log('is Odd: ', result2);

