function getDiscountedTotalForCategory(products, category) {
  return products
    .filter(product => product.category === category)
    .map(product => product.price * 0.90)
    .reduce((total, price) => total + price, 0);
}

const products = [
  { name: "Pen", category: "stationery", price: 100 },
  { name: "Bag", category: "accessory", price: 500 },
  { name: "Notebook", category: "stationery", price: 60 }
];

console.log(getDiscountedTotalForCategory(products, "stationery"));