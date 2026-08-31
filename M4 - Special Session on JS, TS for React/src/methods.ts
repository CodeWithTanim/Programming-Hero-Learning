// filter(), map(), find(), include()

/**
 * filter() ---> delete
 * map() ---> showing data on the ui
 * find() ---> find out a specific data
 * include() ---> a data in a array or not
*/

// filter()
const numbers = [1, 2, 3, 4, 5]
const newArr = numbers.filter(num => num !== 2)
console.log((newArr));

// map()
const newArr1 = numbers.map(num => num + 1)
console.log(newArr1);

const newArr1_1 = numbers.map((num, index) => {
    console.log(index);
    return num + 1;
})

// find()
const products = ['book', 'laptop', 'pen'];

const searchProducts = products.find(item => item === 'pen')
console.log(searchProducts);

const products1 = [
    {
        name: 'book',
        price: 100,
    },
    {
        name: 'pen',
        price: 10,
    },
    {
        name: 'laptop',
        price: 52000,
    },
];

const searchProducts1 = products1.find(item => item.price > 100)
console.log(searchProducts1);


// include()
const string = 'Hello I am fine'
console.log(string.includes('am'));
console.log(string.includes('name'));

const n = [1, 2, 3, 4, 5, 6]
console.log(n.includes(5));
console.log(n.includes(10));

if (n.includes(10)) {
    console.log('Array has 10');
} else {
    console.log('No 10');
}