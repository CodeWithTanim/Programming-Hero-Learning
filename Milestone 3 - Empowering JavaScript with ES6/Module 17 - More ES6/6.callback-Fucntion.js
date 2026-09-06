// A calllback is a function passed as an argiment to another function

// I will call back letter!


function regiserStudent(cb) {
    console.log("User is registering. Need More data.");
    console.log(cb);
    cb();
};


function userBasicInfo (){
    let student = {
        name: "Tanim",
        age: 24,
        roll: 212,
    };
    // return student;
    console.log(student);
};

function passAcademicInfo () {
    let academicInfo = {
        ssc: '5.00',
        hsc: '4.92',
    };
};

console.log(regiserStudent(userBasicInfo));

console.log(regiserStudent(passAcademicInfo));

function calculator (a, b, cb) {
    let sum = a + b;
    cb(sum);
};


function displayResult (result) {
    console.log(result);
}


console.log(calculator(5, 3, displayResult));