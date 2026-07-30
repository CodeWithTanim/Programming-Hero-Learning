let arr = [4, 5, 3, 6, 7, 8];

// console.log(arr.length);

// console.log(arr[0]);
// console.log(arr[1]);
// console.log(arr[2]);
// console.log(arr[3]);

let i = 0;

while (i < arr.length) {
    console.log(arr[i], i);
    i++;
}


let sum = 0;
for (let j = 0; j < arr.length; j++) {
    console.log(arr[j], j), sum;
    sum += arr[j];
}
console.log("Sum: ", sum);




let k = arr.length - 1;

while (k >= 0) {
    console.log(arr[k]);
    k--;
}

for (let l = arr.length - 1; l >= 0; l--) {
    console.log(arr[l]);
}