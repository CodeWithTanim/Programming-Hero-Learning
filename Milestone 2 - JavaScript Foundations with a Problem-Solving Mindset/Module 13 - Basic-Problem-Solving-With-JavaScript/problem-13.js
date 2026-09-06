// Problem 13: Loop Through an Object's Properties

// without Function

let monitor = {
    color: 'Black',
    brand: 'LG',
    display: 'something',
    size: 'something'
};

console.log(monitor['color']); // bracket notation
console.log(monitor.brand); // dot notation



// for in loop
for (let key in monitor) {
    console.log(key, ":", monitor[key]);
};



// using keys method
let objKey = Object.keys(monitor);
console.log(objKey);

for (let i = 0; i < objKey.length; i++) {
    let key = objKey[i];
    console.log(key, ":", monitor[key]);
}



// for of loop
for (let key of objKey) {
    console.log(key, ":", monitor[key]);
}


console.log();
console.log();
console.log();
// With Function

// for in loop
function showProperties (obj){
    for (let key in obj) {
        console.log(key, ":", obj[key]);
    }
}

showProperties(monitor);

console.log();

// Object.key method
function showProperties(obj) {
    let keys = Object.keys(obj);

    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        console.log(key, ":", obj[key]);
    }
}

showProperties(monitor);

console.log();


// for of loop
function showProperties(obj) {
    let keys = Object.keys(obj);

    for (let key of keys) {
        console.log(key, ":", obj[key]);
    }
}

showProperties(monitor);