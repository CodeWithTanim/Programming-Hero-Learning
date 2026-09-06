"use strict";
// Create HasId interface (id: number). Write findById<T extends HasId> that searches an array for a matching id. Write a call that violates the constraint and comment on the error.
Object.defineProperty(exports, "__esModule", { value: true });
;
function findById(items, id) {
    return items.find(item => item.id === id);
}
;
const users = [
    { id: 1, name: "A" },
    { id: 2, name: "B" }
];
console.log(findById(users, 2));
//# sourceMappingURL=Task-7.js.map