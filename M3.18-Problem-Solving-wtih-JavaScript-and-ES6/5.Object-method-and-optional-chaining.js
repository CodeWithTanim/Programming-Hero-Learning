/*
  Problem 1: Most Expensive Product
  Given an object of product prices, use Object.keys() or Object.entries() + loop to
  find the most expensive product.

  Example: { pen: 20, book: 150, bag: 500 } -> "bag"
*/

const getMostExpensiveProduct = (product) => {
    // console.log(product);
    const keys = Object.keys(product);
    // const entries = Object.entries(product);

    let highest = 0;
    let expensiveProductName = "";

    // console.log(keys);

    for (let key of keys) {
        if (highest < product[key]) {
            highest = product[key];
            expensiveProductName = key;
        }
        // console.log(key, product[key]);
    }
    // console.log(entries);
    // for (let key of entries) {
    //     console.log(key, product[key]);
    // }

    // console.log(highest);
    // console.log(expensiveProductName);
    
    return expensiveProductName;

};

console.log(getMostExpensiveProduct({ pen: 20, book: 150, bag: 500, bat: 565, laptop: 30000 }));




/*
  Problem 2: Safe Nested Access
  Safely access deeply nested optional data using ?. and ?? without
  throwing errors.

  Example: user?.address?.city ?? "City not found" when address is undefined
*/


let user1 = {
    name: "Akash",
    address: {
        city: 'Comilla',
    }
};
let user2 = {
    name: "Akash",
    address: null,
};

const getCity = (user) => {
    return user?.address?.city;
};

console.log(getCity(user1))
console.log(getCity(user2))