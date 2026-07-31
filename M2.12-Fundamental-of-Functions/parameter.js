// parameter

function sayHello(name) {
    console.log('Hello', name);
}

sayHello('Sallu');

const number = 34;
console.log("Hello World!");
sayHello('Shaku');


function add(num1, num2) {
    console.log('You have profuced', num1, num2);
    const sum = num1 + num2;
    console.log('total of the provided number: ', sum);
}

add(3, 5);
add(344, 534);

function sumAll(a, b, c, d) {
    const total = a + b + c + d;
    console.log('Sum of 4 numbers', total);
}

sumAll(1, 2, 3, 4);


function square(number) {
    console.log('Square of', number, 'is: ', number * number);
}

square(5);


function multiTwoNumber(num1, num2) {
    const multi = num1 * num2;
    console.log('Multiplication of', num1, 'and', num2, 'is: ', multi);
}

multiTwoNumber(2, 3);