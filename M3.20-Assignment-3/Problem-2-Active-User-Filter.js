function filterActiveUsers(users) {
    // Write your code here

    if (!Array.isArray(users) || users.length === 0) {
        return "Invalid";
    };


    for (const user of users) {
        if (typeof user !== 'object' || user === null || Array.isArray(user) || !Object.keys(user).includes("isActive")) {
            return "Invalid";
        };
    };

    return users.filter((user) => user.isActive === true);
};



// console.log(filterActiveUsers([
//     { name: "A", isActive: true },
//     { name: "B", isActive: false }
// ]));

// console.log(filterActiveUsers([]));
// console.log(filterActiveUsers([{ name: "A" }]));
// console.log(filterActiveUsers("users"));
// console.log(filterActiveUsers([{ name: "A", isActive: true }, { name: "B", isActive: true }]));
// console.log(filterActiveUsers([{ name: "A", isActive: 1 }]));