"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getStudentResult = (student) => {
    const marks = student.marks;
    const totalMarks = marks.reduce((sum, mark) => sum + mark, 0);
    const average = totalMarks / marks.length;
    const result = average >= 40 ? 'Passed' : 'Failed';
    // const r = {
    //     name: student.name,
    //     average: average,
    //     result: result
    // }
    return {
        name: student.name,
        average: average,
        result: result
    };
};
console.log(getStudentResult({
    name: "Rafi",
    marks: [80, 75, 90, 85]
}));
console.log(getStudentResult({
    name: "Nabil",
    marks: [30, 35, 40, 25]
}));
//# sourceMappingURL=5.getStudentResult.js.map