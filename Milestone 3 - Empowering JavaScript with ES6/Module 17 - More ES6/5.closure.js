// Closure is when a function is able to remember and access its lexical scope even when that function is executing outside its lexical scope

function createCounter () {
    let counter = 0;
    return function () {
        counter++;
        return counter;
    };
};

let counter = createCounter();
// console.log(counter);

// console.log(counter());
// console.log(counter());
// console.log(counter());



function cashRegister () {
    let amount = 0;
    return function (payableAmount) {
        // console.log(payableAmount);
        amount += payableAmount;
        return amount;
    }
}

let coffeeShopCashCounnter = cashRegister();

let resturanCashCounter = cashRegister();

let juiceBarCashCounter = cashRegister();

console.log("Coffee Shop: ", coffeeShopCashCounnter(200));
console.log("Coffee Shop: ", coffeeShopCashCounnter(100));
console.log("Coffee Shop: ", coffeeShopCashCounnter(500));

console.log("Resturant Shop", resturanCashCounter(50));


console.log("Coffee Shop: ", coffeeShopCashCounnter(100));

console.log("Juice Bar Shop", juiceBarCashCounter(100));

