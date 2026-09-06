/**
 * MULTIPLE CONDITIONS
 * 
 * 
 * 
 * 
*/

const salary = 25000;
// const salary = 75000;
const isBCS = false;
// const isBCS = true;
// const hasCar = true;
const hasCar = false;

if ( salary > 50000 && isBCS === true && hasCar === true){
    console.log('su.........patro');
}
else{
    console.log('Tor kopale biya nai!!!!')
}


if (salary > 75000 || isBCS === true || hasCar == true){
    console.log('bolo baba kobul');
}
else{
    console.log('nijer chehara aynay dekhcos');
}

// -------------------------------------------------------------
// Multiple together

if((salary > 50000 && hasCar == true) || isBCS){
    console.log('ok');
} else{
    console.log('vag');
}