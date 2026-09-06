const product = {
    name: 'laptop',
    price: 55000,
    stock: 10,
};


const keys = Object.keys(product);
const values = Object.values(product);
console.log(keys, values);

const productName = product.name;
const productPrice = product.price;
console.log(productName);
console.log(productPrice);

const {name, stock, price} = product;

console.log(price);
console.log(name);
console.log(stock);