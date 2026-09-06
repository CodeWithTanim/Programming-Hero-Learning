const user1 = {
    name: 'jodu',
    address: {
        city: "Dhaka",
    },
};

const user2 = {
    name: 'Modu',
};

console.log(user1.address.city);
console.log(user1?.address?.city);
console.log(user2?.address?.city);