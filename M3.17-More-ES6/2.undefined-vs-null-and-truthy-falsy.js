let x;
console.log(x);     // undefined (value not assigned)

let y = null;
console.log(y);     // null (empty manually ownself)

function greet(name) {
    console.log(name);
};

greet();        // undefined (No Argument)

const obj = { age: 25 };
console.log(obj.city);      // undefined (No Property there)



// Falsy value - এই ৬টির একটিও if এর ভেতরে ঢুকবে না।
if (false) {
    console.log(false)
}

if (0) {
    console.log(0)
}

if ("") {
    console.log("")
}

if (null) {
    console.log(null)
}

if (undefined) {
    console.log(undefined)
}

if (NaN) {
    console.log(NaN)
}


// Truthy examples = এগুলো সবসময় চলবে
if ('hello') console.log("Trythy")
if ([]) console.log("Trythy")   // empty array ও Trythy
if ({}) console.log("Trythy")   // empty object ও Trythy

