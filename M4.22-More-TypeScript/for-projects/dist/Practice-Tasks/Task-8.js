"use strict";
// Create a string enum OrderStatus: Placed, Shipped, Delivered, Cancelled. Write a function that prints a readable message for a given status.
Object.defineProperty(exports, "__esModule", { value: true });
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["Placed"] = "Placed";
    OrderStatus["Shipped"] = "Shipped";
    OrderStatus["Delivered"] = "Delivered";
    OrderStatus["Cancelled"] = "Cancelled";
})(OrderStatus || (OrderStatus = {}));
;
function printStatus(status) {
    console.log(`Current Status: ${status}`);
}
;
printStatus(OrderStatus.Placed);
printStatus(OrderStatus.Shipped);
printStatus(OrderStatus.Delivered);
printStatus(OrderStatus.Cancelled);
//# sourceMappingURL=Task-8.js.map