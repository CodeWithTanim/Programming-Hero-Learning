"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function calculateWeeklySteps(steps) {
    let total = 0;
    for (let i = 0; i < steps.length; i++) {
        total += steps[i];
    }
    return total;
}
console.log(calculateWeeklySteps([3000, 5200, 4100]));
console.log(calculateWeeklySteps([7000, 6500]));
console.log(calculateWeeklySteps([]));
//# sourceMappingURL=3.calculateWeeklySteps.js.map