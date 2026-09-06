type VehicleType = 'scooter' | 'e-bike' | 'moped'


function calculateRentalFee (vehicle: VehicleType, minutes: number): number {
    if (vehicle === 'scooter') {
        return 10 + minutes * 2;
    } else if (vehicle === 'e-bike') {
        return 15 + minutes * 3;
    }
    return 25 + minutes * 5
}

console.log(calculateRentalFee("scooter", 20));
console.log(calculateRentalFee("e-bike", 20));
console.log(calculateRentalFee("moped", 20));
console.log(calculateRentalFee("scooter", 0));