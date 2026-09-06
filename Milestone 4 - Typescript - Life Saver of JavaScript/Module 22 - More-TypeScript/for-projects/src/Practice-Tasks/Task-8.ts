// Create a string enum OrderStatus: Placed, Shipped, Delivered, Cancelled. Write a function that prints a readable message for a given status.

enum OrderStatus {
    Placed = 'Placed',
    Shipped = 'Shipped',
    Delivered = 'Delivered',
    Cancelled = 'Cancelled',
};

function printStatus (status: OrderStatus): void {
    console.log(`Current Status: ${status}`);
};

printStatus(OrderStatus.Placed);
printStatus(OrderStatus.Shipped);
printStatus(OrderStatus.Delivered);
printStatus(OrderStatus.Cancelled);