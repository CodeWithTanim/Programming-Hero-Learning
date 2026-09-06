"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
const mark = {
    name: 'Mark',
    id: 101,
    department: 'Engineering',
    salary: 75000,
};
const bill = {
    name: 'Bill',
    id: 102,
    department: 'Marketing',
};
const team = [mark, bill, {
        name: 'Alice',
        id: 103,
        department: 'Security',
    }];
function printEmployeeDetails(employee) {
    console.log(`Name: ${employee.name}`);
    console.log(`ID: ${employee.id}`);
    console.log(`Department: ${employee.department}`);
}
;
printEmployeeDetails({ name: 'Elon', department: 'spaceX', id: 10 });
function displayEmployeeDetails({ name, id, department }) {
    console.log(`Name: ${name}`);
    console.log(`ID: ${id}`);
    console.log(`Department: ${department}`);
}
;
displayEmployeeDetails({ name: 'Elon', department: 'spaceX', id: 10 });
displayEmployeeDetails(mark);
//# sourceMappingURL=interface.js.map