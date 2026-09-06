const calculateBMI = (weight, height) => {
    if (weight <= 0 || height <= 0) {
        return "Invalid";
    };
    return Number((weight / (height * height)).toFixed(2));
};

console.log(calculateBMI(70, 1.75));
console.log(calculateBMI(80, 1.56));
console.log(calculateBMI(80, -1.7));
console.log(calculateBMI(-70, 1.5));