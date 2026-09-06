// Create a Product interface with title: string, price: number, inStock?: boolean. Create two product objects — one with inStock, one without. Write a function that logs a product's price.

interface Product {
    title: string;
    price: number;
    isStock?: boolean;
};


const product1: Product = {
    title: 'Laptop',
    price: 80000,
};


const product2: Product = {
    title: 'Mobile',
    price: 26000,
};


function logPrice(product: Product): void {
    console.log(product.price);
};

logPrice(product1);
logPrice(product2);
