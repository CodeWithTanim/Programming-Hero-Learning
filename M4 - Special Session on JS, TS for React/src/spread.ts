const arr = [1, 2, 3, 4];
const newArr = [...arr]     // make copy of arr so orginal array should not be change

newArr.push(5)
newArr.push(6)

console.log(newArr);
console.log('orginal array: ', arr);

const user = {
    name: 'abcdg',
    age: 25,
    city: 'Dhaka',
}

const newUser = {...user, image: 'url_jdfgkdjfgdfg'};
console.log(newUser);
newUser.image = 'url---'

console.log(newUser);
console.log('original obj', user);

