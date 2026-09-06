function verifyCartTotal(itemPrices, displayedTotal) {
    if (!Array.isArray(itemPrices)) {
        return "Invalid";
    }

    if (typeof displayedTotal !== "number") {
        return "Invalid";
    }

    let total = 0;

    for (let i = 0; i < itemPrices.length; i++) {
        if (typeof itemPrices[i] !== "number") {
            return "Invalid";
        }

        total = total + itemPrices[i];
    }

    return total === displayedTotal;
}

console.log(verifyCartTotal([250, 400, 150], 800));
console.log(verifyCartTotal([250, 400, 150], 750));