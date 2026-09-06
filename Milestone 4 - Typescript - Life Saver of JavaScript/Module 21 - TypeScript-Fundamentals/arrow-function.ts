// const getLargerName = (person1, person2) => {
//     if (person1.length > person2.length) {
//         return person1;
//     } return person2;
// };

const getLargerName = (person1: string, person2: string): string => {
    if (person1.length > person2.length) {
        return person1;
    } return person2;
};

const biggerName = getLargerName("Abul", "Kabuuul");
console.log(biggerName);