function cloneAndUpdate (arr, index, newValue) {
    const newArr = [...arr];

    newArr[index] = newValue;

    return newArr;
};

const numbers = [5, 10, 15];

const updated = cloneAndUpdate(numbers, 1, 99);

console.log(updated);