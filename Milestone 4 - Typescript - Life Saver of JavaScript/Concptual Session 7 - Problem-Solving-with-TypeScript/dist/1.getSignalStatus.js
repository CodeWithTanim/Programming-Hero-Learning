"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getSignalStatus(percentage) {
    if (percentage < 0 || percentage > 100) {
        return 'Invalid';
    }
    else if (percentage <= 25) {
        return 'Poor';
    }
    else if (percentage <= 55) {
        return 'Fair';
    }
    else if (percentage <= 85) {
        return 'Good';
    }
    else {
        return 'Excellent';
    }
}
console.log(getSignalStatus(-34));
console.log(getSignalStatus(0));
console.log(getSignalStatus(15));
console.log(getSignalStatus(38));
console.log(getSignalStatus(66));
console.log(getSignalStatus(95));
console.log(getSignalStatus(100));
console.log(getSignalStatus(106));
//# sourceMappingURL=1.getSignalStatus.js.map