function findProductByName(products, name) {
    return products.find(product => product.name === name);
};


const products = [
    { name: "Pen", price: 10 },
    { name: "Bag", price: 500 },
];


console.log(findProductByName(products, "Bag"));

console.log(findProductByName(products, "Laptop"));