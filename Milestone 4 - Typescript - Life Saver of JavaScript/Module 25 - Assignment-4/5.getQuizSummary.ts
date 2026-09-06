interface QuizSummary {
    total: number
    average: number
}


function getQuizSummary (scores: number[]): QuizSummary {
    const total = scores.reduce((sum, score) => sum + score, 0);

    if (scores.length === 0) {
        return {
            total: 0,
            average: 0
        };
    };

    const average = total / scores.length;

    return {
        total,
        average
    };
};

// console.log(getQuizSummary([8, 9, 7, 10]));
// console.log(getQuizSummary([5, 5]));
// console.log(getQuizSummary([]));