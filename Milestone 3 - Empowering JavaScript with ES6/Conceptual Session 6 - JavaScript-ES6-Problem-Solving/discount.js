
const discountTotal = (prices)=>{

    // let updatedPrice = []

    // for(let i = 0; i<prices.length; i++){
    //     let discountPrice = prices[i] - 5
    //     updatedPrice.push(discountPrice)
    // }

    // let total = 0;
    // for(let i = 0; i<updatedPrice.length; i++){
    //     total = total + updatedPrice[i]
    // }
    // return total

    // updatedPrice = [95,245,75]

    const updatedPrice = prices.map(price=> price-5)
// sum = 95 + 245 +75
    const total = updatedPrice.reduce((sum,price)=> sum + price, 0)
    return total
}

console.log(discountTotal([100, 250, 80]))
