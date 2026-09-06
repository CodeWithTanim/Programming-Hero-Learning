const numbers = [34, 67, 23, 72, 43, 56, 78, 23];

const length = numbers.length;

console.log("Length Of Array:  ", length)


for (let i = 0 ; i < numbers.length; i++) {
    console.log("Index Value", i);
    const item = numbers[i];
    console.log("Value of the item is : ", item);
}