type OrderItem = {
    name: string
    price: number
}

function calculateOrderTotal(items: OrderItem[]): number {
    return items.reduce((total, item) => total + item.price, 0)
}




console.log(
    calculateOrderTotal([
        { name: "Burger", price: 250 },
        { name: "Fries", price: 90 },
        { name: "Soda", price: 60 }
    ])
);

console.log(
    calculateOrderTotal([
        { name: "Pizza", price: 500 }
    ])
);

console.log(calculateOrderTotal([]));