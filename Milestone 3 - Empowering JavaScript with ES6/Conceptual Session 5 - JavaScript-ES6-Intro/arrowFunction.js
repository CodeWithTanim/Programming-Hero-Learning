function sum (num1, num2) {
    return num1 + num2;
};


console.log(sum(10, 20));

const total = (num1, num2) => num1 + num2;
console.log(total(50, 50));



const arr = [10, 20, 3];
const result = arr.map((num) => num * 2);

console.log(result)


const functionName = (num1, num2) => {
    let num3 = num1 + 10;
    return num3 + num2;
};

console.log(functionName(10,20));