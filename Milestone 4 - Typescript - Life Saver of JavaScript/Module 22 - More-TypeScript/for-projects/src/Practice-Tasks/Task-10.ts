// Create Employee interface (name, id, salary, department). Write updateEmployee using Partial<Employee>. Build two new types with Pick<Employee, "name" | "id"> and Omit<Employee, "salary">.

interface Employee {
    name: string;
    id: number;
    salary: number;
    department: string;
}

function updateEmployee(employee: Partial<Employee>): void {
    console.log(employee);
}

updateEmployee({
    name: "Rafi",
});

type EmployeeBasic = Pick<Employee, "name" | "id">;

type EmployeeWithoutSalary = Omit<Employee, "salary">;

const basicEmployee: EmployeeBasic = {
    name: "Rafi",
    id: 101,
};

const employeeWithoutSalary: EmployeeWithoutSalary = {
    name: "Rafi",
    id: 101,
    department: "IT",
};

console.log(basicEmployee);
console.log(employeeWithoutSalary);