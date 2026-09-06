// take 3 number and return largest

const a = 3;
const b = 15;
const c = 2;

if (a > b && a > c) {
    console.log("larget a");
} else if (b > a && b > c) {
    console.log("largest b");
} else {
    console.log("largest c");
};


function findLargest(a, b, c) {
    if (a > b && a > c) {
        return a;
    } else if (b > a && b > c) {
        return b;
    } else {
        return c;
    };
};

const largest1 = findLargest(4, 1, 2);
console.log(`largest of 1st is ${largest1}`);

const largest2 = findLargest(443, 165, 223);
console.log(`largest of 2nd is ${largest2}`);

const largest3 = findLargest(445, 156, 234);
console.log(`largest of 3rd is ${largest3}`);