function getEmployeeDept(employee) {
    const {
        job: { title, department }
    } = employee;

    return { title, department };
};


console.log(getEmployeeDept({ name: "Nadia", job: { title: "PM", department: "Product" } }));

