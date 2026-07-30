const subject = "chemistry";
const book = "Chemistry";

console.log(book.toLowerCase())

if (subject.toLowerCase() === book.toLowerCase()) {
    console.log("Read the book");
} else {
    console.log("Auto Pass");
}



const emailUserProvided = 'goni@mia.com ';
const emailSavedDatabase = 'goni@mia.com';

// console.log('###:', emailSavedDatabase.trimStart().trimEnd(), '###')
console.log('###:', emailSavedDatabase.trimStart().trimEnd().toLowerCase(), '###')

if (emailSavedDatabase.trim() === emailUserProvided.trim()) {
    console.log("Welcome");
} else {
    console.log("Dure Giye Mor");
}

// const emailUserProvided = 'goni@Mia.com ';
// const emailSavedDatabase = 'goni@mia.com';


// if (emailSavedDatabase.toLowerCase() === emailUserProvided.toLowerCase()) {
//     console.log("Access Granted");
// } else {
//     console.log("Access Granted");
// }