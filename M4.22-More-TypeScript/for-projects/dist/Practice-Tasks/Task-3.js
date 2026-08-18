"use strict";
// Create a Product interface with title: string, price: number, inStock?: boolean. Create two product objects — one with inStock, one without. Write a function that logs a product's price.
Object.defineProperty(exports, "__esModule", { value: true });
;
const product1 = {
    title: 'Laptop',
    price: 80000,
};
const product2 = {
    title: 'Mobile',
    price: 26000,
};
function logPrice(product) {
    console.log(product.price);
}
;
logPrice(product1);
logPrice(product2);
//# sourceMappingURL=Task-3.js.map