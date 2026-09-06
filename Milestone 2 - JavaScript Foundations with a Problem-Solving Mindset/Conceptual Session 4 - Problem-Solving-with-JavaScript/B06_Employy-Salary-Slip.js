function generateSalarySlip(employee) {
    if (typeof employee !== "object" || employee === null) {
        return "Invalid";
    }

    if (typeof employee.basicSalary !== "number") {
        return "Invalid";
    }

    if (typeof employee.bonus !== "number") {
        return "Invalid";
    }

    if (typeof employee.tax !== "number") {
        return "Invalid";
    }

    let netSalary =
        employee.basicSalary + employee.bonus - employee.tax;

    return {
        name: employee.name,
        netSalary: netSalary
    };
}

let employee = {
    name: "Karim",
    basicSalary: 30000,
    bonus: 5000,
    tax: 2000
};

console.log(generateSalarySlip(employee));