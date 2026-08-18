"use strict";
// Create an appConfig object (theme, version), lock it with as const. Try mutating a property and comment on the resulting error. Derive a union type from an array using typeof + as const.
Object.defineProperty(exports, "__esModule", { value: true });
const appConfig = {
    theme: 'dark',
    version: 2,
};
// Error: Cannot assign to 'theme' because it is a read-only property.
// appConfig.theme = "light";
const colors = ['red', 'green', 'blue'];
const selectedColor = 'green';
console.log(selectedColor);
//# sourceMappingURL=Task-9.js.map