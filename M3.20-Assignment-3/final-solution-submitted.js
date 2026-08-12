//Problem-01: Student Introduction Generator
function studentIntroduction(student) {
    // Write your code here

    if (typeof student !== 'object' || student === null || Array.isArray(student)) {
        return "Invalid";
    };


    const allProperties  = Object.keys(student);


    if (!allProperties.includes("name") || !allProperties.includes('age') || !allProperties.includes('course')) {
        return "Invalid";
    };


    const {name, age, course} = student;

    
    return `My name is ${name}. I am ${age} years old. I am learning ${course}.`;
};

//Problem-02: Active User Filter
function filterActiveUsers(users) {
    // Write your code here

    if (!Array.isArray(users) || users.length === 0) {
        return "Invalid";
    };


    for (const user of users) {
        if (typeof user !== 'object' || user === null || Array.isArray(user) || !Object.keys(user).includes("isActive")) {
            return "Invalid";
        };
    };

    return users.filter((user) => user.isActive === true);
};



//Problem-03: Trending Hashtag Counter
function countHashtags(caption) {
    // Write your code here…

    if (typeof caption !== 'string') {
        return "Invalid";
    };

    const words = caption.split(" ");

    let hashtagCount = 0;
    let longestTag = "";

    for (const word of words) {
        if (word.startsWith("#")){
            const tag = word.slice(1);

            hashtagCount++;

            if(tag.length > longestTag.length) {
                longestTag = tag;
            };
        };
    };
    
    return {
        hashtagCount: hashtagCount,
        longestTag: longestTag
    };

};

//Problem-04: Bonus Score Calculator
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

//Problem-05: Debugging Challenge - AI Leaderboard Generator
function generateLeaderboard(students) {
    if (!Array.isArray === (students) || students.length === 0) {
        return "Invalid";
    }
    

    for (const student of students) {
        if (typeof student !== 'object' || student === null || !Object.keys(student).includes("name") || !Object.keys(student).includes("score") || typeof student.score !== 'number') {
            return "Invalid";
        }

    }

    const qualified = students.filter((student) => student.score >= 70);

    const names = qualified.map((student) => student.name.toUpperCase());

    return names.slice(0, 3);
};

