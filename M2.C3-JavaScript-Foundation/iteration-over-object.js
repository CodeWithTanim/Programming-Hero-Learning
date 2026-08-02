const animal = {
    name: 'Dog',
    age: 2,
    sound: 'Barking',
    leg: 4,
    eyesCount: 2,
    skinColor: 'black'
};

// for (let item in animal) {
// for (let item of animal) { // Not Works
for (let keys in animal) {
    console.log(`Properties ==> ${keys}, values ==> ${animal[keys]}`);
}

const student = {
    name: 'Karim',
    class: 5,
    address: {
        zilla: 'chodogram',
        thana: 'gunoboti',
        house: {
            road: 3,
            houseNo: 43,
        }, 
    },
    marks: [70, 87, 68],
};

console.log(student);
console.log(student.address.thana);
console.log(student.address.house.houseNo);
console.log(student.marks);


