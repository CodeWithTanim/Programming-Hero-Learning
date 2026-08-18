interface Employee {
    name: string;
    id: number;
    department: string;
    salary?: number;
};

const mark: Employee = {
    name: 'Mark',
    id: 101,
    department: 'Engineering',
    salary: 75000,
};

const bill: Employee = {
    name: 'Bill',
    id: 102,
    department: 'Marketing',
};



const team: Employee[] = [mark, bill, {
    name: 'Alice',
    id: 103,
    department: 'Security',
}];



function printEmployeeDetails(employee: Employee): void {
    console.log(`Name: ${employee.name}`);
    console.log(`ID: ${employee.id}`);
    console.log(`Department: ${employee.department}`);
};

printEmployeeDetails({ name: 'Elon', department: 'spaceX', id: 10 });

function displayEmployeeDetails({ name, id, department }: Employee): void {
    console.log(`Name: ${name}`);
    console.log(`ID: ${id}`);
    console.log(`Department: ${department}`);
};

displayEmployeeDetails({name: 'Elon', department: 'spaceX', id: 10});
displayEmployeeDetails(mark);
