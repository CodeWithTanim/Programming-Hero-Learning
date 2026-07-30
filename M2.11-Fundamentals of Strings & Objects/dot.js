const person = {
    name : 'Tobarak Ali',
    prefession : 'student',
    age : 21,
    isSingle : true
};

console.log(person);
console.log(person.prefession);

const age = person.age;
console.log(age);

person.age = 29;
console.log(person);

person.isSingle = false;
console.log(person);

