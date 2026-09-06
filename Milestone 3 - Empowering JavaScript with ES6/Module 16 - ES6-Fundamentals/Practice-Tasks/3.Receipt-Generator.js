function generateReceipt(customerName, items, total) {
    if (!Array.isArray(items) || items.length === 0) {
        return "Invalid";
    }
    return `Receipt for ${customerName}
    Item: ${items.join(", ")}
    Total: ৳ ${total}`;
}

console.log(generateReceipt("Tanim", ['Pen', 'Book'], 150));
console.log(generateReceipt("Tanim", ['Pen'], 10));
console.log(generateReceipt("Tanim", [], -50));

