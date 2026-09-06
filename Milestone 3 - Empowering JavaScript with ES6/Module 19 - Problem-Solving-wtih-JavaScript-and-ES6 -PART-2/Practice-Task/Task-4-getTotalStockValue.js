function getTotalStockValue(products) {
  return products.reduce((total, product) => {
    return total + product.price * product.stock;
  }, 0);
}

const products = [
  { price: 50, stock: 4 },
  { price: 20, stock: 10 }
];

console.log(getTotalStockValue(products));