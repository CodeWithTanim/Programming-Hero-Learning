

function sayGreet(name) {
    return `Hello ${name}, Good Morning!`
};


console.log(sayGreet("Tanim"));



// Arry Funtion Syntax

// const sayGreet = () => {
//     return "Something"
// };


// for empty and multiple paramenter --> first bracket is required
// for single parameter --> first bracket is required


const sayGreets = (name) => {
    return `Hello ${name}, Good Morning/Night!`
};

const sayGreeting = (name) => `Hello ${name} Bro, This is Morning.`;    //impliciti return

console.log(sayGreets("Tanim"));

console.log(sayGreeting("Tanim"));


const sumFirstThenMultiply = (a, b) => {
    const sum = a + b;
    const multiply = sum * 3;
    return multiply;
};

const sumFirstThenMultiply2 = (a, b) => (a + b) * 3;

console.log(sumFirstThenMultiply(4, 3));
console.log(sumFirstThenMultiply2(4, 3));


const sayHi = () => "Hi";

console.log(sayHi());





// console.log(this);

const student = {
    name: "Tanim",
    age: 24,
    showName: function() {
        console.log(this);
        // return student.name
        return this.name;
    },
    showAge: ()=> {
        // console.log(this);
        return `Age: ${this.age}`;
    }
};

console.log(student.showName());
console.log(student.showAge());