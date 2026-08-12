/*
  Module 19 Summary — map, filter, find, reduce, chaining, closures, callbacks

  Quick recap:
    map()     -> transforms each item, returns a NEW array (same length)
    filter()  -> keeps items matching a condition, returns a NEW array (any length)
    find()    -> returns the FIRST matching item itself (or undefined), not an array
    reduce()  -> folds the whole array down to ONE value (always pass an initial value!)
    chaining  -> filter().map().reduce() reads left to right, step by step
    closures  -> a function "remembers" variables from where it was created
    callbacks -> functions passed as arguments (e.g. sort's comparator)
    mutation  -> objects/arrays are passed by reference — copy with {...obj} / [...arr]
                 before changing them if the original must stay untouched

  Practice tasks below: read the problem + example, fill in each TODO
  yourself first. Full solutions are commented out at the bottom of
  this file — only check them after you've attempted it.
*/



/*
  Practice Task 1: Tag Expensive Products
  Given an array of products, return a NEW array where each product
  also has an "expensive" boolean field (true if price >= 1000).
  Original array must not change.

  Input:
    [{ name: "Mouse", price: 600 }, { name: "Monitor", price: 12000 }]

  Output:
    [
      { name: "Mouse", price: 600, expensive: false },
      { name: "Monitor", price: 12000, expensive: true },
    ]
*/

const tagExpensiveProducts = (products) => {
    // TODO: use map() + spread — don't forget to return!
    return products.map((product) => ({
        ...product,
        expensive: product.price >= 1000,
    }));
};



/*
  Practice Task 2: Find the First Out-of-Stock Item
  Given an array of items with a "stock" field, return the first item
  where stock === 0. Return undefined if everything is in stock.

  Input:
    [{ name: "Pen", stock: 5 }, { name: "Bag", stock: 0 }]

  Output:
    { name: "Bag", stock: 0 }
*/

const findOutOfStock = (items) => {
    // TODO: use find()
    return items.find((item) => item.stock === 0);
};



/*
  Practice Task 3: Total Marks of Passing Students (Chaining)
  Given students with marks, filter students who passed (marks >= 40),
  then sum their marks — in one chained expression.

  Input:
    [{ name: "Rafi", marks: 80 }, { name: "Karim", marks: 30 }]

  Output:
    80
*/

const totalPassingMarks = (students) => {
    // TODO: filter -> map/reduce
    return students.filter((student) => student.marks >= 40).reduce((total, student) => total + student.marks, 0);
};



/*
  Practice Task 4: Closure — Bank Balance Tracker
  createAccount(startingBalance) returns an object with deposit(amount)
  and getBalance() methods. Balance must be private — no direct access
  except through getBalance().

  Input:
    const acc = createAccount(100);
    acc.deposit(50);
    acc.getBalance();

  Output:
    150
*/

const createAccount = (startingBalance) => {
    // TODO: keep "balance" private inside the closure,
    // return { deposit, getBalance }
    let balance = startingBalance;

    return {
        deposit: (amount) => {
            balance += amount;
        },
        getBalance: () => balance,
    };
};



/*
  Practice Task 5: Sort Products by Price (Ascending) — No Mutation
  Return a NEW array of products sorted by price, low to high. The
  original products array must stay in its original order.

  Input:
    [{ name: "Bag", price: 500 }, { name: "Pen", price: 20 }]

  Output:
    [{ name: "Pen", price: 20 }, { name: "Bag", price: 500 }]
*/

const sortByPriceAscending = (products) => {
    // TODO: copy with spread first, then .sort((a, b) => a.price - b.price)
    return [...products].sort((a, b) => a.price - b.price);
};



let products = [
    { name: "Mouse", price: 600 },
    { name: "Monitor", price: 12000 },
];
let items = [
    { name: "Pen", stock: 5 },
    { name: "Bag", stock: 0 },
];
let students = [
    { name: "Rafi", marks: 80 },
    { name: "Karim", marks: 30 },
];

// Uncomment as you complete each task:
// console.log(tagExpensiveProducts(products));
// console.log(findOutOfStock(items));
// console.log(totalPassingMarks(students));
// const acc = createAccount(100);
// acc.deposit(50);
// console.log(acc.getBalance());
// console.log(sortByPriceAscending([{ name: "Bag", price: 500 }, { name: "Pen", price: 20 }]));



/* --------------------------------------------------------------------
   SOLUTIONS — reveal only after attempting the tasks above yourself.
   --------------------------------------------------------------------

const tagExpensiveProducts = (products) => {
  return products.map((product) => ({
    ...product,
    expensive: product.price >= 1000,
  }));
};

const findOutOfStock = (items) => {
  return items.find((item) => item.stock === 0);
};

const totalPassingMarks = (students) => {
  return students
    .filter((student) => student.marks >= 40)
    .reduce((accumulator, student) => accumulator + student.marks, 0);
};

const createAccount = (startingBalance) => {
  let balance = startingBalance;

  return {
    deposit: (amount) => {
      balance += amount;
    },
    getBalance: () => balance,
  };
};

const sortByPriceAscending = (products) => {
  return [...products].sort((a, b) => a.price - b.price);
};

-------------------------------------------------------------------- */