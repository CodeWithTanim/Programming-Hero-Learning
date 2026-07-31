// return

function cutHalf(number) {
    const half = number / 2;
    return half;
    // console.log('after return', half)
}

console.log('~~~~~~~~~~~~~~~~~~~~');
const result = cutHalf(50);
console.log(result);

const number2 = cutHalf(80);

function add(num1, num2){
    const sum = num1 + num2;
    return sum;
}

const total = add(12, 16);
console.log('value of total', total);

const total2 = add(result, number2);
console.log('value of total2', total2);