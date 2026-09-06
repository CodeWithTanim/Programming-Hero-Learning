const animal = {
    name: 'Dog',
    age: 2,
    sound: 'Barking',
    leg: 4
};

// console.log(animal);

const animalProperty = Object.keys(animal);
console.log(animalProperty);

const propertyValues = Object.values(animal);
console.log(propertyValues);

const keyValuePair = Object.entries(animal);
console.log(keyValuePair);

animal.eyesCount = 2;
animal['skinColor'] = 'black';
console.log(animal);

