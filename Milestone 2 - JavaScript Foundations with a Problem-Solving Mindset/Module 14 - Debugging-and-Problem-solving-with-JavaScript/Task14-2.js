// Bug: find why score = 50 doesn't return "Pass"

// Bug: That was > 50 so it's shows fail instead of Pass

function checkScore(score) {
    if (score >= 50) {
        return "Pass";
    } else {
        return "Fail";
    }
}

console.log(checkScore(50)); // Expected: "Pass" (currently wrong)
console.log(checkScore(40)); // Expected: "Fail"
