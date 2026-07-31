function isEven (number) {
    console.log(number, 'divided by 2 er vagsesh', number % 2);
    if (number % 2 === 0 ){
        return true;
    } else {
        return false;
    }
}

// isEven(50);
const result = isEven(57);
console.log('is Even', result);