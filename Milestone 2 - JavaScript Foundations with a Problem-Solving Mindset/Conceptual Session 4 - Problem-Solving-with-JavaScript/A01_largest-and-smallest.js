function findLargestSmallest (arr) {
    if (!Array.isArray(arr)) {
        return "Invalid";
    };

    for (let i = 0; i < arr.length; i++) {
        if (typeof arr[i] !== 'number') {
            return "Invalid";
        };
    };

    if (arr.length === 0) {
        return "Invalid";
    };

    let largest = arr[0];
    let smallest = arr[0];

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > largest) {
            largest = arr[i];
        };
        
        if (arr[i] < smallest) {
            smallest = arr[i];
        };
    };
    
    return `Number: ${arr}, 
    Largest: ${largest}
    Smallest: ${smallest}`;
};

console.log(findLargestSmallest([45, 12, 89, 3, 67]));