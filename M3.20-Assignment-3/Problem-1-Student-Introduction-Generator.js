function studentIntroduction(student) {
    // Write your code here

    if (typeof student !== 'object' || student === null || Array.isArray(student)) {
        return "Invalid";
    };


    const allProperties  = Object.keys(student);


    if (!allProperties.includes("name") || !allProperties.includes('age') || !allProperties.includes('course')) {
        return "Invalid";
    };


    const {name, age, course} = student;


    return `My name is ${name}. I am ${age} years old. I am learning ${course}.`;
};


// console.log(studentIntroduction({ name: "Rafi", age: 18, course: "JavaScript" }));
// console.log(studentIntroduction({}));
// console.log(studentIntroduction("student"));
// console.log(studentIntroduction({ name: "Tanim", age: 20 }));
// console.log(studentIntroduction(null));