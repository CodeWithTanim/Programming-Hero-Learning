"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function updateStorageUsage(currentUsagesMB, action) {
    if (action.type === 'upload') {
        return currentUsagesMB + action.sizeMB;
    }
    return Math.max(0, currentUsagesMB - action.sizeMB);
}
console.log(updateStorageUsage(2000, { type: "upload", sizeMB: 500 }));
console.log(updateStorageUsage(2000, { type: "delete", sizeMB: 800 }));
console.log(updateStorageUsage(300, { type: "delete", sizeMB: 1000 }));
//# sourceMappingURL=9.updateStorageUsage.js.map