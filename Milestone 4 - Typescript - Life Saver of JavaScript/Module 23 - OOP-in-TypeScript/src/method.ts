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

    getInfo() {
        const info = `Name: ${this.name}\nEmail: ${this.email}`
        return info
    }
};

// instantiate
// instance
// const rafi = new Student('Rafi', 'rafi@gmail.com', 16, 100)
// const sadia = new Student('Sadia', 'sadia@gmail.com', 17, 80)
// console.log(rafi.getInfo())
// console.log(rafi)
// console.log(sadia.getInfo())
// console.log(sadia)


/**
 * title
 * soldItems
*/

class ChaShop{
    title: string
    soldItems:any = []

    constructor (title:string) {
        this.title = title
    }

    buy(name:string, price: number) {
        this.soldItems.push({name, price})
    }

    totalSold() {
        const total = this.soldItems.reduce((acc, item) => acc + item.price, 0)
        return total
    }

}

const shop1 = new ChaShop('Tea Shop')
shop1.buy("Tea", 14)
shop1.buy("Cake", 15)
console.log(shop1);
console.log(shop1.totalSold())