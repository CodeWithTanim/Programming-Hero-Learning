type Product = {
    name: string
    price: number
};


const calculateCartTotal = (products:Product[]): number => {
    const total:number = products.reduce((sum, item) => sum + item.price, 0)
    return total;
}


const products = [
    { name: "Keyboard", price: 1500 },
    { name: "Mouse", price: 800 },
    { name: "USB Cable", price: 300 }
];
 
console.log(calculateCartTotal(products));
 
// another example:
const products2 = [
    { name: "Book", price: 500 },
    { name: "Pen", price: 50 },
    { name: "Bag", price: 1200 }
];
 
console.log(calculateCartTotal(products2));
