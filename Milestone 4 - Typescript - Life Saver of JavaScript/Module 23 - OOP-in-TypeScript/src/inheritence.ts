// Parent Class/Super class
class User {
    private _name: string
    private _age: number
    protected _email: string

    constructor(name: string, age: number, email: string) {
        this._name = name
        this._age = age
        this._email = email
    }

    get age() {
        return this._age
    }


    set age(value: number) {
        if (value < 0 || value > 100) {
            throw new Error('Age is not valid')
        }

        this._age = value
    }


}


// child class
class Student extends User{
    private _fee: number;

    constructor(name: string, age: number, email: string, fee: number) {
        super(name, age, email)
        this._fee = fee
    }



}

const student = new Student('Rafi', 20, 'rafi@gmail.com', 4999)
console.log(student);

// const user = new User('Abul', 27, 'abul@abul.com')
// console.log(user)

// user.age = 30
// console.log(user.age)