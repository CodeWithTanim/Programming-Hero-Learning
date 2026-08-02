// const arr = [45, 23, 455, 239, 553, 210];


// let largest = arr[0];


// for (let i = 0; i < arr.length; i++) {
//   let val = arr[i];
//   console.log(val, largest);
//   if (val > largest) {
//     console.log(largest);
//     largest = val;
//   }
// }



function getLargest(arr) {
    let largest = arr[0];
    for (let i = 0; i < arr.length; i++) {
        let val = arr[i];
        // console.log(val, largest);
        if (val > largest) {
            //   console.log(largest);
            largest = val;
        }
    }
    return largest;
}

const arr1 = [45, 23, 455, 239, 553, 210];


const largest = getLargest(arr1);
console.log(largest, 'Largest');