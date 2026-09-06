// Write a generic function getLastElement<T> that returns the last element of an array. Test with number[] and string[].

function getLastElement<T> (arr: T[]): T | undefined {
    return arr[arr.length - 1];
};

console.log(getLastElement([10, 20, 30] ));
console.log(getLastElement(["a", "b", "c"]));