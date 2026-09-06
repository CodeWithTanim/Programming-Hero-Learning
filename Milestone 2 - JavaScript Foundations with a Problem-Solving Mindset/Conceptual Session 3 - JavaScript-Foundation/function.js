// function greet () {
//     console.log('Hello Tanim');
// };

// greet();
// greet();
// greet();

function greet2 (name, age, designation) {
    // console.log(name);
    console.log(`Hello ${name}, he is ${age} years old, he is a ${designation}`);
};

greet2('Tanim', 23, "Programmer");
greet2('Rahim', 25, "SQA");
// greet2('Kamal');

function greet3 (name, age = 20, designation="Bekar") {
    // console.log(name);
    console.log(`Hello ${name}, he is ${age} years old, he is a ${designation}`);
};

greet3("Kamal", 25, "Shopkeeper");
greet3("Abul");

