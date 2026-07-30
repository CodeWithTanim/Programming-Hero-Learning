// Task 7.1 — Keys and Values
// let book = { title: "The Hobbit", author: "Tolkien", pages: 310 };
// Get an array of all keys 
// Get an array of all 
// Delete the pages property using delete.


let book = { title: "The Hobbit", author: "Tolkien", pages: 310 };

console.log(Object.keys(book));

console.log(Object.values(book));

delete book.pages;
console.log(book);