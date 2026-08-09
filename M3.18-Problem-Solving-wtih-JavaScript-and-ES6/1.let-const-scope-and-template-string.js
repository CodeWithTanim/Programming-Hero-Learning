/*
  Problem 1: Fix the Scope Bug
  Rewrite using let to fix the output.
*/

let status ="Order Placed";

for (var i = 1; i <= 3; i++) {
    let status = "Processing Item " + i;
    // console.log(status);
}

// console.log("Final Status: ", status);




/*
  Problem 2: Receipt Generator (Template Strings)
  Build a receipt generator using template strings — take item name,
  price, qty as input, output formatted multiline receipt.

  Example: Input ("Pen", 20, 3) -> Output "Pen x3 = 60 Taka"
*/

function receiptGenerator (name, price, qty) {
    // console.log(name, price, qty);
    // return name + ' X' + qty + ' = ' + price * qty + ' Taka';
    return `${name} X${qty} = ${price * qty}`;
};

// receiptGenerator("tanim", 10, 5);
console.log(receiptGenerator("pen", 10, 5));
