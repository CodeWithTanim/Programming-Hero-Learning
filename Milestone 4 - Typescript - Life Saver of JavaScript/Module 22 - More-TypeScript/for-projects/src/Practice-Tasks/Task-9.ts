// Create an appConfig object (theme, version), lock it with as const. Try mutating a property and comment on the resulting error. Derive a union type from an array using typeof + as const.

const appConfig = {
    theme: 'dark',
    version: 2,
} as const;

// Error: Cannot assign to 'theme' because it is a read-only property.
// appConfig.theme = "light";

const colors = ['red', 'green', 'blue'] as const;

type Color = typeof colors[number];

const selectedColor: Color = 'green';

console.log(selectedColor);