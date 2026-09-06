function getTopSellingProduct(orders) {
    const totals = orders.reduce((acc, order) => {
        acc[order.product] = (acc[order.product] || 0) + order.unitsSold;
        return acc;
    }, {});

    return Object.entries(totals)
        .map(([product, unitsSold]) => ({ product, unitsSold }))
        .reduce((topProduct, currentProduct) => {
            return currentProduct.unitsSold > topProduct.unitsSold
                ? currentProduct
                : topProduct;
        }).product;
}

const orders = [
    { product: "Pen", unitsSold: 30 },
    { product: "Bag", unitsSold: 12 },
    { product: "Pen", unitsSold: 25 }
];

console.log(getTopSellingProduct(orders));
