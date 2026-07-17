let productName = "Wireless Mouse";
let price = 15;
let quantity = 4;
let taxPercent = 5;

 
let subtotal = price * quantity;
let taxAmount = (subtotal * taxPercent) / 100;
let grandTotal = subtotal + taxAmount;

 

console.log("---- Shopping Bill ----");
console.log("Product:", productName);
console.log("Price per unit:", price);
console.log("Quantity:", quantity);
console.log("Subtotal:", subtotal);
console.log("Tax (" + taxPercent + "%):", taxAmount);
console.log("Grand Total:", grandTotal);
console.log("------------------------");