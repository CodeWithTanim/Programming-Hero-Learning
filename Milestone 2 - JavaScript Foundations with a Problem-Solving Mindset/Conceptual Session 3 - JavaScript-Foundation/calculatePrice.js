// make a function where it take product price and it disocunt

function calculatePrice (price, discount) {
    const discountPrice = (discount * price) / 100;
    const priceAfterDiscount = price - discount;
    return priceAfterDiscount;
}

const product1 = calculatePrice(20, 15);
console.log(product1, "Price after Discount of Product 1");

const product2 = calculatePrice(250, 15);
console.log(product2, "Price after Discount of Product 2");

