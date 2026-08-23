type DistanceSummary = {
    total: number
    average: number
}

function getDistanceSummary (distances: number[]): DistanceSummary {
    if (distances.length === 0) {
        return {
            total: 0,
            average: 0
        };
    }
    
    const total = distances.reduce((sum, distance) => sum + distance, 0);

    const average = total / distances.length;

    return {
        total,
        average
    }
}


console.log(getDistanceSummary([4, 6, 5, 9]));
console.log(getDistanceSummary([10, 10]));
console.log(getDistanceSummary([]));