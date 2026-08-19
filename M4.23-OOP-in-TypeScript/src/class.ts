/**
 * name
 * email
 * age
 * marks
*/

class Student {
    name: string
    email: string
    age: number
    marks: number

    
    // constructor ---> special type of method
    constructor(name: string, email: string, age: number, marks: number) {
        this.name = name
        this.email = email
        this.age = age
        this.marks = marks
    }
};

// instantiate
// instance
const rafi = new Student('Rafi', 'rafi@gmail.com', 16, 100)
const sadia = new Student('Sadia', 'sadia@gmail.com', 17, 80)
console.log(rafi)
console.log(sadia)