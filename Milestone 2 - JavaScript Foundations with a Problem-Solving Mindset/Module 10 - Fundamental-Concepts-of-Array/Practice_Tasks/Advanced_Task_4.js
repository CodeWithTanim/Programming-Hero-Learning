let num = [1, [2, 3], [4, 5], 6];

let flat = [];

for (let i = 0; i < num.length; i++) {
    if (Array.isArray(num[i])) {
        for (let j = 0; j < num[i].length; j++) {
            flat.push(num[i][j]);
        }
    } else {
        flat.push(num[i]);
    }
}
console.log(flat);