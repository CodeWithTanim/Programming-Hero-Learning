const commitment = 'I will work hard and will never give up.';

// Reverse this: .pu evig reven lliw dna drah krow lliw I

// const parts = commitment.split('');
// console.log(parts);

// const reversedParts = parts.reverse();
// console.log(reversedParts);


// const reversedCommitment = reversedParts.join('');
// console.log(reversedCommitment);

let reverseCom = '';

for (const letter of commitment) {
    // reverseCom = reverseCom + letter;
    reverseCom = letter + reverseCom;
    console.log(letter, reverseCom);
}
console.log(reverseCom);


