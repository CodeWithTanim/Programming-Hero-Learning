const studentName = 'Rafi';
const studentAge = 15;
const studentEmail = 'rafi@gmail.com';

const studentName2 = 'Sabiha';
const studentAge2 = 17;
const studentEmail2 = 'sabiha@gmail.com';

// Object

const rafi = {
    name: 'Rafi',
    age: 15,
    email: 'rafi@gmail.com',
}

const sabiha = {
    name: 'Sabiha',
    age: 17,
    email: 'sabiha@gmail.com'
}

const createStudent = (name: string, age: number, email: string) => {
    const obj = {name, age, email}
    return obj
}

const rafiData = createStudent('Rafi', 16, 'rafi@gmail.com');
const sadiaData = createStudent('Sadia', 19, 'sadia@gmail.com');
console.log(rafiData)
console.log(sadiaData)