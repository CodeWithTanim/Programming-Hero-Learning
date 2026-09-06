const person = {
    name : 'Tobarak Ali',
    prefession : 'student',
    age : 21,
    isSingle : true,
};

delete person.isSingle;
delete person['prefession'];

console.log(person);

const keys = Object.keys(person);
console.log(keys);

const values = Object.values(person);
console.log(values);

console.log(Object.entries(person));