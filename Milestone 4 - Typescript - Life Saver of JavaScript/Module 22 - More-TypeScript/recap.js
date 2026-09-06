"use strict";
/**
 * 1. variable (basic types)
 * 2. Array
 * 3. Function
 * 4. Object
 * ... ...
*/
const destination = 'Saint Martin';
const helicopters = 33;
const countries = ['Bangladesh', 'India', 'Pakistan', 'China'];
function buybook(title, price, discount) {
    if (discount === undefined) {
        discount = 0;
    }
    ;
    return `The book ${title} costs ${price - discount}`;
}
;
const tubelight = {
    brand: 'Philips',
    color: 'white',
    price: 12.99,
    isAvailable: true,
};
//  union string | number | boolean | null
