const information = 'I am Tanim. And I am a Developer';

// string slicing
const slicedstr = information.slice(5, 15);
console.log(slicedstr);


const information2 = "his friends name is Alam. And he is a SQA.";

// String concatanation

const concatedStr = information + information2;
console.log(concatedStr);

const concatedStr2 = information.concat(information2);
console.log(concatedStr2);

const concatedStr3 = `${information} ${information2}`;
console.log(concatedStr3);

const concatedStr4 =  `Information of Programmer: ${information} Another Programmer Information: ${information2}`;
console.log(concatedStr4);


// includes
if (concatedStr4.toLowerCase().includes("developer")) {
    console.log("Develoepr Found");
} else {
    console.log("Developer Not Found");
}

