/**
 * 1. variable (basic types)
 * 2. Array
 * 3. Function
 * 4. Object
 * ... ...
*/

const destination: string = 'Saint Martin';
const helicopters: number = 33;

const countries: string[] = ['Bangladesh', 'India', 'Pakistan', 'China'];
function buybook (title: string, price: number, discount?: number): string {
    if (discount === undefined) {
        discount = 0
    };
    return `The book ${title} costs ${price - discount}`;
};

const tubelight: {
    brand: string,
    color: string,
    price: number,
    isAvailable: boolean,
} = {
    brand: 'Philips',
    color: 'white',
    price: 12.99,
    isAvailable: true,
};



//  union string | number | boolean | null
