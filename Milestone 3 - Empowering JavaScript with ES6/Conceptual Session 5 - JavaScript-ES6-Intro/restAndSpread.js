const arr1 = [10, 20, 30];
const arr2 = [50, 60, ...arr1];
// cosnt finalArr = 

const obj = {
    name: 'Modu',
    role: 'instructor',
};

console.log(arr2);

console.log(obj);

// obj.id = 293;
// const updatedObj = {obj, id: 29}
const updatedObj = {...obj, id: 29}

console.log(updatedObj);






// Rest

function sum (...numbers) {
    let total = 0;
    for (let i = 0; i < numbers.length; i++) {
        total += numbers[i];
    }
    console.log(total);
}

sum(1, 2, 3);
