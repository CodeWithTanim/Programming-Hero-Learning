"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getStockStatus = (stock) => {
    if (stock <= 0) {
        return 'Out of Stock';
    }
    else if (stock >= 1 && stock <= 5) {
        return 'Almost Sold Out';
    }
    else if (stock >= 6 && stock <= 20) {
        return 'Available';
    }
    else {
        return 'In Stock';
    }
    ;
};
console.log(getStockStatus(0));
console.log(getStockStatus(3));
console.log(getStockStatus(13));
console.log(getStockStatus(46));
//# sourceMappingURL=2.getStockStatus.js.map