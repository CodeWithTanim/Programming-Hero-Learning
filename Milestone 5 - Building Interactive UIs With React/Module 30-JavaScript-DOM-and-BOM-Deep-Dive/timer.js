// set time out

// console.log('a');
// console.log('b');

// setTimeout(fn, delay in ms);
// const timeoutId = setTimeout(() => {
//     console.log('Order Place Successfull');
// }, 3000)


// clearTimeout(timeoutId);

// console.log('c');

// set interval
// setInterval(fn, delay in ms)
let count = 0;
const intervalId = setInterval(() => {
    count++;
    console.log(`Interval Executed ${count} Times`);
    if (count === 5) {
        clearInterval(intervalId)
    }
}, 1000)


// setInterval(() => {
//     let date = new Date()
//     let time = date.toLocaleTimeString()
//     console.log(time);
// }, 1000);