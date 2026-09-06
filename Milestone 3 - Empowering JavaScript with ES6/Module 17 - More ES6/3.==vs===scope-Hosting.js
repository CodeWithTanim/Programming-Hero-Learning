console.log(5 == "5");
console.log(5 === "5");

console.log(0 == false);
console.log(0 === false)

console.log(null == undefined);
console.log(null === undefined);


// Global Scope
let name = "Tanim";

for (let i = 0; i < 5; i++) {
    console.log(name);
};

if (true) {
    console.log(name);
};



// Block Scope
for (let i = 0; i < 5; i++) {
    let address = "Bogura";
    // console.log(address);
};

// console.log(address);   // address is not defined

{
    var addresss = "Pabna";
    // console.log(addresss);
};
console.log(addresss);  // becauese of var its can show it

{
    let mou = 'Mou';
    // console.log(mou);
};
// console.log(mou);    //  mou is not defined


// Function Scope
function add(a ,b) {
    let sum = a + b;
    console.log(sum);
};
// console.log(sum);   //  sum is not defined

