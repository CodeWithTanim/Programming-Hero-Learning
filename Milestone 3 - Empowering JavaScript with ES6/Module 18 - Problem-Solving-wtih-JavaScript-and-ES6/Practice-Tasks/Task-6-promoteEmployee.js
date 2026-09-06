function promoteEmployee(employee, newTitle) {
    return {...employee, title: newTitle
    };
}


const employee = {
    name: "Rafi",
    title: "Junior Dev"
};



const promoted = promoteEmployee(employee, "Senior Dev");


console.log(promoted);
// { name: "Rafi", title: "Senior Dev" }


console.log(employee);
// { name: "Rafi", title: "Junior Dev" }