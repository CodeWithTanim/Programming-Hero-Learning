function isLeapYear(year) {
    if (typeof year !== 'number') {
        return "Invalid";
    };

    if (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) {
        return true;
    } else {
        return false;
    };
};

console.log(isLeapYear(2024));
console.log(isLeapYear(1900));
console.log(isLeapYear(2000));