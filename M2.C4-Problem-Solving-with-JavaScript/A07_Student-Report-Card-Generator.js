function generateReportCard(student) {
    if (typeof student != 'object' || student === null) {
        return "Invalid";
    };

    if (typeof student.bangla != 'number' || student.bangla < 0 || student.bangla > 100) {
        return 'Invalid';
    };
    
    if (typeof student.english != 'number' || student.english < 0 || student.english > 100) {
        return 'Invalid';
    };
    if (typeof student.math != 'number' || student.math < 0 || student.math > 100) {
        return 'Invalid';
    };


    let total = student.bangla + student.english + student.math;
    let average = total / 3;
    let grade;

    if (average >= 80) {
        grade = "A+";
    } else if (average >= 70) {
        grade = "A";
    } else if (average >= 60) {
        grade = "B";
    } else if (average >= 50) {
        grade = "C";
    } else {
        grade = "F";
    };

    return {
        name: student.name,
        total: total,
        average: average,
        grade: grade
    };
};


let student = {
    name: 'Tanim',
    bangla: 78,
    english: 84,
    math: 87,
}

console.log(generateReportCard(student));