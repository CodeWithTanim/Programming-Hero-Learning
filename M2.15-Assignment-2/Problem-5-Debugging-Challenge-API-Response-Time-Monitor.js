/* এই ফাংশনের সব বাগ খুঁজে ঠিক করো — নাম পরিবর্তন করবে না */
function averageResponseTime(times) {
    if (Array.isArray(times) === false) {
        return "Invalid";
    }

    if (times.length === 0) {
        return "Invalid";
    }

    let total = 0;
    for (let i = 0; i < times.length; i++) {

        if (typeof times[i] !== 'number'){
            return 'Invalid';
        }

        total = total + times[i];
    }

    return total / times.length;
}


// console.log(averageResponseTime([50,100,150]));