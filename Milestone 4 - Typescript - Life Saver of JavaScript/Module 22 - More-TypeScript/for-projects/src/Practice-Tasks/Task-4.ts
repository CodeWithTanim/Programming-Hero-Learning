// Create a type alias PaymentMethod = "cash" | "card" | "mobile". Comment why interface can't express this. Create an Order interface using PaymentMethod.

type PaymentMethod = 'cash' | 'card' | 'mobile';

// Interface describes object shapes, where union of literal values is better represented using a type alias.

interface Order {
    id: number;
    method: PaymentMethod;
};

const order: Order = {
    id: 1,
    method: "card",
};

console.log(order);