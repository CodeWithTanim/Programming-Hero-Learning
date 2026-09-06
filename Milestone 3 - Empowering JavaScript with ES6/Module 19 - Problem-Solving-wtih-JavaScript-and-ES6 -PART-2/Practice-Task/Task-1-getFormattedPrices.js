function getFormattedPrices(prices) {
    return prices.map(price => `$${price}`);
};

console.log(getFormattedPrices([100, 250, 75]));
