"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function canAccessOfflineMode(tire) {
    if (tire === 'pro' || tire === 'premium') {
        return true;
    }
    return false;
}
console.log(canAccessOfflineMode('free'));
console.log(canAccessOfflineMode('pro'));
console.log(canAccessOfflineMode('premium'));
//# sourceMappingURL=6.canAccessOfflineMode.js.map