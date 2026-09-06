function bonusScore(scores) {
    // Write your code here

    if (!Array.isArray(scores) || scores.length === 0) {
        return "Invalid";
    };

    for (const score of scores) {
        if (typeof score !== 'number') {
            return "Invalid";
        };
    };

    const updatedScores = scores.map((score) => score + 10);

    return updatedScores.reduce((total, score) => total + score, 0);
};




// console.log(bonusScore([80, 65, 90, 75]));
// console.log(bonusScore([100]));
// console.log(bonusScore([0, 10]));
// console.log(bonusScore([]));
// console.log(bonusScore("scores"));
// console.log(bonusScore([80, "90", 70]));
// console.log(bonusScore([10, 20, 30, 40, 50]));