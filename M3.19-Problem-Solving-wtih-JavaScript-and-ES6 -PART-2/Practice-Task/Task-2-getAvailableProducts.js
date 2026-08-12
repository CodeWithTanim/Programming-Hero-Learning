function getAvailableProducts(products) {
    return products.filter(product => product.stock > 0);
};

const products = [
    { name: "Pen", stock: 5 },
    { name: "Bag", stock: 0 },
    { name: "Notebook", stock: 2 },
];

console.log(getAvailableProducts(products));

