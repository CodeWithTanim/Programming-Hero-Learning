const applyCoupon = (order) =>{
    // console.log(order);

    const discountPrice = order.total * 0.1
    // discountPrice = 50
    const newPrice = order.total - discountPrice
    // newPrice = 450

    // order.total = newPrice
    // console.log("after setting new price");
    // console.log(order);
    // return order

 

    return {...order, total:newPrice}
}

const returnResult = applyCoupon({ orderId: "A1", total: 500, customer: "Mim" } )

console.log(returnResult)
