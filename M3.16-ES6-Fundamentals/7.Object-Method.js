// Object Methods — Keys, Values, Entries, Delete, Seal, Freeze

const user = {
    name: "John Doe",
    age: 35,
    id: 4545,
};


// Keys & Values
const keys = Object.keys(user);
const values = Object.values(user);

console.log(keys, values);
console.log(keys.length, values.length);


for (let elem of keys) {
    console.log(elem, user[elem]);
};


// Entries Method
const entries = Object.entries(user);
console.log(entries);
console.log();

for (let elem of entries) {
    const [key, value] = elem
    console.log(key, value)
};


// Delete Method
delete user.age;
console.log(user);


// Seal & FreezeMethod
const bankAcc = {
    accNumber: "1234",
    balance: 5000,
}

Object.seal(bankAcc);
delete bankAcc.balance;     // Delete Not Possiblem
console.log(bankAcc);

bankAcc.nomineName = "ABCD";        // No New Item can Add
console.log(bankAcc);

bankAcc.balance = 500;      // Edit possible
console.log(bankAcc);

// Freeze
const birthCertificate = {
    name: "Tanim",
    birthDate: "01-10-2004",
    CertificateNumber: 200445678910234568,
};

console.log(birthCertificate);
Object.freeze(birthCertificate);        // Noting Possible

delete birthCertificate.name
birthCertificate.CertificateNumber = '989898';
birthCertificate.new = "Test";

console.log(birthCertificate);