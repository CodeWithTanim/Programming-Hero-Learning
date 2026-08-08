function secondLargest(arr) {
    if (!Array.isArray(arr)) {
        return "Invalid";
    }

    for (let i = 0; i < arr.length; i++) {
        if (typeof arr[i] !== "number") {
            return "Invalid";
        }
    }

    let largest = arr[0];
    let secondLargest = arr[1];

    if (secondLargest > largest) {
        let temp = largest;
        largest = secondLargest;
        secondLargest = temp;
    }

    for (let i = 2; i < arr.length; i++) {
        if (arr[i] > largest) {
            secondLargest = largest;
            largest = arr[i];
        } else if (arr[i] > secondLargest) {
            secondLargest = arr[i];
        }
    }

    return secondLargest;
}

console.log(secondLargest([45, 12, 89, 3, 67]));