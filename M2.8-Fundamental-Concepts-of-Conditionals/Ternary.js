/**
 * binary = two
 * ternary --> three
 * 
 * condition ? if true: if false
*/

const age = 20;

// if (age >= 18){
//     console.log('please vote');
// }
// else{
//     console.log('grow up kid');
// }

// age >= 18 ? console.log('please vote') : console.log('Grow up Kid');

// const price = 500; // Reassign not possible
let price = 500;
// const isLeader = false;
const isLeader = true;
// if(isLeader === true){
// if(isLeader){
//     price = 0;
// }
// else{
//     price = price + 100;
// }

// console.log('price is : ', price);

// price = 'condition' ? 'true': 'false'

price = isLeader ? 0 : price + 100;
console.log('price now: ', price);