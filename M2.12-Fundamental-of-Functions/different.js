function chowdhurify(name){
    const fullName = name + ' ' + 'Chowdhury';
    return fullName;
}

const robinChow = chowdhurify('Robin');
console.log(robinChow);

const shammiChow = chowdhurify('Shammi');
console.log(shammiChow);

function fullName (firstName, lastName) {
    const fullName = firstName + ' ' + lastName;
    return fullName;
}

const mohabbat = fullName('Mohabbot', "Ali");
console.log(mohabbat);


function doubleOrHalf(price, isDouble) {
    if (isDouble === true){
        const askingPrice = price * 2;
        return askingPrice;
    } else {
        const askingPrice = price / 2;
        return askingPrice;
    }
}

const myPrice = doubleOrHalf(100, true);
console.log('price for mango people: ', myPrice);

const leaderPrice = doubleOrHalf(100, false);
console.log(leaderPrice);


function firstElementDouble(array){
    console.log('got the parameter value', array)
    const firstElemet = array[0];
    const doubled = firstElemet * 2;
    return doubled;
}

const numbers = [45, 8, 7, 541, 69, 12];
const doubled = firstElementDouble(numbers);
console.log('dobuled of the first element: ', doubled);



const student = {
    name: 'Monir Abdul',
    id: 15,
    marks: 75
};

function isStudentAPlus(student){
    console.log('go the student', student);
    const marks = student.marks;
    console.log('his marks', marks);
    if (marks => 80) {
        return true;
    } else {
        return false;
    }
}

const isAPLus = isStudentAPlus(student);

console.log(isAPLus);