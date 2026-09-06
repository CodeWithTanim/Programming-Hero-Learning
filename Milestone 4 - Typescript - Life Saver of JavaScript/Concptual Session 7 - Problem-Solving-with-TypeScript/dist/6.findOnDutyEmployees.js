"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function findOnDutyEmployees(employees) {
    return employees.filter(employees => employees.onDuty);
}
console.log(findOnDutyEmployees([
    { name: "Lima", onDuty: true },
    { name: "Karim", onDuty: false }
]));
console.log(findOnDutyEmployees([
    { name: "Nusrat", onDuty: false }
]));
//# sourceMappingURL=6.findOnDutyEmployees.js.map