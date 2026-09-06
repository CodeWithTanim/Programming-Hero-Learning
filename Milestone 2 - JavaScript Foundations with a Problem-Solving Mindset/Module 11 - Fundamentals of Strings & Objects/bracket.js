const person = {
    name : 'Tobarak Ali',
    prefession : 'student',
    age : 21,
    isSingle : true,
    'home Address' : 'Nowakhali',
    "parent:name" : 'Kodom Ali'
};


console.log(person.age);
console.log(person['name']);
console.log(person['home Address']);
console.log(person['parent:name']);

person['age'] = 24;
person['home Address'] = 'Dhaka';
console.log(person);

const key = 'profession'
// console.log(person.key);
console.log(person[key]);