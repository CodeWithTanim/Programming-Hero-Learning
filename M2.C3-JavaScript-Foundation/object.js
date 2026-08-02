// let model = 'Toyota';
// let price = 200000;
// let milage = 25;

// const tanim = [model, price, milage];
// console.log(tanim);

const car = {
  name: 'Toyota',
  price: 20000,
  milage: 28,
  color: 'black',
  version: 'v3',
};


const car2 = {
  name: 'BMW',
  price: 3000000,
  milage: 35,
  color: 'red',
  version: 'v6',
};

// console.log(car);
// console.log(car2);

// console.log(car['milage']);
// console.log(car['version']);

// console.log(car.name);
// console.log(car.color);

car['milage'] = '50';
console.log(car);

car2.name = 'Rols Royals';
console.log(car2);

delete car2.version;
console.log(car2);

delete car['price'];
console.log(car);

car.name = 'BMW';
console.log(car);