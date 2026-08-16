function calculateTax (amount:number | string, taxRate:number):number {
    if (typeof amount === 'string') {
        amount = parseFloat(amount);
    }
    return amount * taxRate;
};

const myTax = calculateTax(100, 0.15);
const yourTax = calculateTax('200', 0.2);

// Null
const myFuture: number | null = null;

// undefined
let myMoney: number | undefined;


// any ----> can use any type
const myVariable: any = 'hello';

// unknown

// never ----> never return
