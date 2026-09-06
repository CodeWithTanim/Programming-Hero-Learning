let marks = 80;

let isAdult = true;


// logical AND => &&
// If Both True then AND Operator make that True otherwise its make false. 
console.log(marks >= 80);
console.log((marks >= 80) && isAdult); // Both should be true then ans True

// Logical OR => ||
// If anyone is True that is True. And if both False then that is False.
console.log(marks >= 80 || isAdult);

// Logical NOT => !
// Its just reverse the condition
console.log(!isAdult);
console.log(!(marks >= 80 )|| isAdult);

