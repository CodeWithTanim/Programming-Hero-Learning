
interface Track {
    title: string
    minutes: number
}

function calculateTotalListeningTime(tracks: Track[]): number {
    return tracks.reduce((total, track) => {
        return total + track.minutes;
    }, 0)
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