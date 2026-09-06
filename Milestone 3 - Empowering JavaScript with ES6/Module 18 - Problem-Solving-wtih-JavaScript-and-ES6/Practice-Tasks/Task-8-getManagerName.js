function getManagerName(employee) {
    return employee.manager?.name;
};

let details = {
    name: "Mim",
    manager: {
        name: "Tanvir",
    },
};

console.log(getManagerName(details));