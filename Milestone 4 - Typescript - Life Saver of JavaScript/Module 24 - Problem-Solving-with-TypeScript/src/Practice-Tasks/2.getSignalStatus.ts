function getSignalStatus(strenght: number): string {
    if (strenght >= 0 && strenght <= 20) {
        return 'Weak'
    } else if (strenght >= 21 && strenght <= 50) {
        return 'Fair'
    } else if (strenght >= 51 && strenght <= 80) {
        return 'Good'
    }
    return 'Excelent'
}

console.log(getSignalStatus(10));
console.log(getSignalStatus(35));
console.log(getSignalStatus(65));
console.log(getSignalStatus(95));
console.log(getSignalStatus(20));
console.log(getSignalStatus(21));
console.log(getSignalStatus(80));
console.log(getSignalStatus(81));
