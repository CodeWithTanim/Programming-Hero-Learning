// Create a generic interface Container<T> with item: T. Create one Container<number> and one Container<string>.

interface Container<T> {
    item: T;
};

const numberContainer: Container<number> = {
    item: 103,
};

const stringContainer: Container<string> = {
    item: 'Books'
};

console.log(numberContainer);
console.log(stringContainer);