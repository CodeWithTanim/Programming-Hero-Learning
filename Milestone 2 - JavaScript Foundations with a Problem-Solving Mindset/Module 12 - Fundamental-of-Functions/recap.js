// 1. how to declare function
function firstFunction(){

}

function divide (num1, num2){
    const result = num1 / num2;
    console.log('divide result', result);
}

// 2. how to call a function
firstFunction();

// 3. how to deal with parameter
divide(500, 8);

// 4. how to deal with return
function doMath(a, b, c, d){
    const firstSum = a + b;
    const secondSum = c + d;
    const multiplied = firstSum * secondSum;
    const divide = multiplied / 4;
    return divide;
}

const result = doMath(4, 8, 16, 24);
const denominator = 2;

// 5. Call Function with variables
divide(result, denominator);

