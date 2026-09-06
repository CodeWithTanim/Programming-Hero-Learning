function calculateRemainingMoney(totalMoney, cakeCost, donutCost) {
    // TODO: Implement the function
    let remaining = totalMoney - cakeCost;
    if (remaining <= 0) return remaining;
    let donuts = Math.floor(remaining / donutCost);
    remaining -= donuts * donutCost;
    return remaining;
}


// console.log(calculateRemainingMoney(100, 20, 10));
// console.log(calculateRemainingMoney(50, 30, 7));
// console.log(calculateRemainingMoney(100, 25, 30));
// console.log(calculateRemainingMoney(20, 15, 10));
// console.log(calculateRemainingMoney(100, 100, 5));