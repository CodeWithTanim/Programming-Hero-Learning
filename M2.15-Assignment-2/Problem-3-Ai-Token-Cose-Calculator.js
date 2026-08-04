function calculateAiCost(tokensUsed) {
 // Write your code here.
    if (typeof tokensUsed !== 'number' || tokensUsed < 0){
        return 'Invalid';
        
    }
    if (tokensUsed <= 500) {
        return 0;
    };

    let extraToken = tokensUsed - 500;
    let charges = Math.floor(extraToken / 100) * 5;

    return charges;
}


// console.log(calculateAiCost(300));
// console.log(calculateAiCost(650));
// console.log(calculateAiCost(1000));
// console.log(calculateAiCost(-10));