function evenOrOdd (number) {
    if (number % 2 === 0) {
        // console.log("Even")
        return "Even";
    } else {
        // console.log("Odd")
        return "Odd";
    }
}

console.log(evenOrOdd(5));
console.log(evenOrOdd(4));
console.log(evenOrOdd(2));
console.log(evenOrOdd(9));

const a = 21;
const aEvenOrOdd = evenOrOdd(a);
console.log(`${a} is a ${aEvenOrOdd}`)