let name = 'Tanim';

let location = "Bogura, Rajshahi";

console.log(location);

let price = 500;

let message = "Hello " + name + ". Your Bill is " + price;

console.log(message);

let messages = `Hello ${name}. Your Bill is ${price}`;
console.log(messages);

let quantity = 5;

let priceMessage = `Hello ${name}. You Bill is ${price * quantity}`;

console.log(priceMessage);


// Example:

// console.log(uniMessage);

function uniPayment(name = "Sudent", amount = 5000) {
    // let amount = 2500;
    let uniMessage = `Hello ${name}, 
            Your Payment is successfull
            Your Paid Amount is ${amount}`;
    return uniMessage;
};

console.log(uniPayment("Tanim", 4564));
console.log(uniPayment());