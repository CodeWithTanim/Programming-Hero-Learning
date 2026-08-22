type Student = {
    name: string
    marks: number[]
};

interface Result {
    name: string
    average: number
    result: string
}

const getStudentResult = (student: Student): Result => {
    const marks: number[] = student.marks
    const totalMarks: number = marks.reduce((sum, mark) => sum + mark, 0)
    const average: number = totalMarks / marks.length

    const result: string = average >= 40 ? 'Passed' : 'Failed'

    // const r = {
    //     name: student.name,
    //     average: average,
    //     result: result
    // }

    return {
        name: student.name,
        average: average,
        result: result
    }

}


console.log(getStudentResult({
    name: "Rafi",
    marks: [80, 75, 90, 85]
}));


console.log(getStudentResult({
    name: "Nabil",
    marks: [30, 35, 40, 25]
}));
