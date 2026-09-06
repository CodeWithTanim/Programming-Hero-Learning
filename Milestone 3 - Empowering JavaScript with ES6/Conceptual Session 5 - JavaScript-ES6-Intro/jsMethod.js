const product = [
    { name: 'pen', price: 10, inStock: true },
    { name: 'pen', price: 20, inStock: true },
    { name: 'book', price: 50, inStock: false },
    { name: 'bag', price: 500, inStock: true },
];

const withVat = product.map((product) => product.price + (product.price * 0.1));

console.log(withVat);

let user = [
    {name: 'Tanim'},
    {name: 'Jodu'},
    {name: 'Modu'},
];

const sendEmail = (name) => {
    console.log("Email send to: ", name);
};

user.forEach((user) => sendEmail(user.name));



const filteredData = product.filter((product) => product.name == 'pen');

console.log(filteredData);

const filteredDataa = product.find((product) => product.name == 'pen');
console.log(filteredDataa);


