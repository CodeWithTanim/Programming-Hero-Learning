// Task 9.1 — Contact Book
// Build a small "contact" system:
// let contact = {
//   name: "Alex Johnson",
//   email: "ALEX@EMAIL.COM",
//   phone: "555-1234"
// };
// Convert the email to lowercase and update the object.
// Loop through the contact object and print each key-value pair.
// Add a new property favoriteWords: [] (an array) — push 3 words to it.
// Reverse the name string just for fun using one of your three reverse functions from Task 4.1.
// Check if the email includes "@email.com" (case-insensitive) and log a confirmation message.


let contact = {
  name: "Alex Johnson",
  email: "ALEX@EMAIL.COM",
  phone: "555-1234"
};

// 1
contact.email = contact.email.toLowerCase();
console.log(contact.email);

// 2
for (let key in contact) {
    console.log(key + ": ", + contact[key]);
}

// 3
contact.favoriteWords = [];

contact.favoriteWords.push("JavaScript");
contact.favoriteWords.push("Developer");
contact.favoriteWords.push("Coding");

// 4

// 5
if (contact.email.includes("@email.com")) {
    console.log("Email is Valid");
} else {
    console.log("Email is not Valid");
}