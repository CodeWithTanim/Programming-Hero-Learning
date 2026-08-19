class Animal {
    private _name;

    constructor(name: string) {
        this._name = name
    }

    makeSound(): void {
        console.log('Animal Make Sound')
    }
}




class Cat extends Animal {
    makeSound(): void {
        console.log('Meowwww')
    }
}



class Dog extends Animal {
    makeSound(): void {
        console.log('whoof whoof')
    }
}



const cat = new Cat('Billu')
const dog = new Dog('Dog')


// cat.makeSound();
// dog.makeSound();









// Example 2:

abstract class Shape {
    abstract area(): number

    describe () {
        console.log('This is a shape')
    }
}


class Circle extends Shape {
    radius: number
    constructor (radius: number) {
        super()
        this.radius = radius
    }

    area(): number {
        return 3.1416 * this.radius * this.radius
    }
}


class Rectengle extends Shape {
    height: number
    width: number

    constructor (height: number, width: number) {
        super()

        this.height = height
        this.width = width
    }

    area(): number {
        return this.height * this.width
    }
}

const circle = new Circle(5)
const rectengle = new Rectengle(5, 4)

// console.log(circle.area())
// console.log(rectengle.area())



// Math.floor()
// Math.cell()
// Math.random()

const d = new Date()
console.log(d)