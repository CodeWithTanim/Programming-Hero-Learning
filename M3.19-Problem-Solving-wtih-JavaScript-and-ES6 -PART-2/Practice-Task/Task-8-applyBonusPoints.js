function applyBonusPoints(users, bonus) {
    return users.map(user => ({
        ...user,
        points: user.points + bonus
    }));
}

const users = [
    { name: "Rafi", points: 20 }
];

const updatedUsers = applyBonusPoints(users, 5);

console.log(updatedUsers);


console.log(users);
