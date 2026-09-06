let price = 200;
let quantity = 3;
let discount = 10; // percent

// Total
let totalPrice = price * quantity;

// Discount
let discountAmount = (totalPrice * discount) / 100;

// Fianl Price
let finalPrice = totalPrice - discountAmount;

console.log("Total Price: ", totalPrice);
console.log("Discount Price: ", discountAmount);
console.log("Final Price: ", finalPrice);