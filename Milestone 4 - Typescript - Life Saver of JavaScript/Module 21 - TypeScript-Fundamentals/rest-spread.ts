const device ={
    name: 'iPhone',
    type: 'smartphone',
    price: 999,
    color: 'black',
    storage: '128GB',
};

const {name: deviceName, ...deviceInfo} = device;

const numbers3: number[] = [1, 2, 3, 4, 5];
const newNumbers: number[] = [6, 7, 8];
const closeFriend: string[] = ['ALice', 'Bob', 'Charlie'];

const allNumbers: number[] = [...numbers3, ...newNumbers];

