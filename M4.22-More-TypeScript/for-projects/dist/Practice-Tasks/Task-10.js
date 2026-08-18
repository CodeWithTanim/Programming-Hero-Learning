"use strict";
// Create Employee interface (name, id, salary, department). Write updateEmployee using Partial<Employee>. Build two new types with Pick<Employee, "name" | "id"> and Omit<Employee, "salary">.
Object.defineProperty(exports, "__esModule", { value: true });
function updateEmployee(employee) {
    console.log(employee);
}
updateEmployee({
    name: "Rafi",
});
const basicEmployee = {
    name: "Rafi",
    id: 101,
};
const employeeWithoutSalary = {
    name: "Rafi",
    id: 101,
    department: "IT",
};
console.log(basicEmployee);
console.log(employeeWithoutSalary);
//# sourceMappingURL=Task-10.js.map