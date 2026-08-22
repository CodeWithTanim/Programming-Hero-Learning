"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function calculateTotalListeningTime(tracks) {
    return tracks.reduce((total, track) => {
        return total + track.minutes;
    }, 0);
}
const tracks = [
    { title: "Blinding Lights", minutes: 3 },
    { title: "Levitating", minutes: 4 },
    { title: "Peaches", minutes: 3 }
];
console.log(calculateTotalListeningTime(tracks));
const tracks2 = [
    { title: "Flowers", minutes: 3 },
    { title: "Anti-Hero", minutes: 4 }
];
console.log(calculateTotalListeningTime(tracks2));
//# sourceMappingURL=4.calculateTotalListeningTime.js.map