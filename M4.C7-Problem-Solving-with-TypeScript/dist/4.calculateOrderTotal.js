"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function calculateOrderTotal(items) {
    return items.reduce((total, item) => total + item.price, 0);
}
console.log(calculateOrderTotal([
    { name: "Burger", price: 250 },
    { name: "Fries", price: 90 },
    { name: "Soda", price: 60 }
]));
console.log(calculateOrderTotal([
    { name: "Pizza", price: 500 }
]));
console.log(calculateOrderTotal([]));
//# sourceMappingURL=4.calculateOrderTotal.js.map