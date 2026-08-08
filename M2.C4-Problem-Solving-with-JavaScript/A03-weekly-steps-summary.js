function weeklyStepsSummary(stepsArray) {
    if (!Array.isArray(stepsArray)) {
        return "Invalid";
    };

    let totalSteps = 0;

    for (let i = 0; i < stepsArray.length; i++) {
        if (typeof stepsArray[i] !== 'number') {
            return "Invalid";
        };
        
        totalSteps += stepsArray[i];
    };



    let goalReached = totalSteps >= 50000;

    return {
        totalSteps: totalSteps,
        goalReached: goalReached
    };
};


console.log(weeklyStepsSummary([8000, 7500, 9200, 6000, 10000, 5500, 4000]));