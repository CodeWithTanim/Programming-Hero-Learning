// Declare a variable of type unknown holding a string. Use it to assert it as a string and get its length. Repeat using angle-bracket syntax <string>.

let value: unknown = 'Hello Bangladesh';

console.log((value as string).length);
console.log((<string>value).length);

