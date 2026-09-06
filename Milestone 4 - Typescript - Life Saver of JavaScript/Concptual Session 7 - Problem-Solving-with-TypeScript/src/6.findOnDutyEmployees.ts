interface Employee {
    name: string
    onDuty: boolean
}

function findOnDutyEmployees (employees: Employee[]): Employee[] {
    return employees.filter(employees => employees.onDuty)
}

console.log(
    findOnDutyEmployees([
        { name: "Lima", onDuty: true },
        { name: "Karim", onDuty: false }
    ])
);

console.log(
    findOnDutyEmployees([
        { name: "Nusrat", onDuty: false }
    ])
);
