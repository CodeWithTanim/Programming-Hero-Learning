interface PlayerStats {
    name: string
    scores: number[]
}

function getPlayerStats(player: PlayerStats): { name: string; average: number; rank: string } {
    if (player.scores.length === 0) {
        return {
            name: player.name,
            average: 0,
            rank: 'Rookie',
        };
    }

    const total = player.scores.reduce((sum, score) => {
        return sum + score
    }, 0)

    const average = total / player.scores.length;

    const rank = average >= 80 ? 'MVP' : 'Rookie';

    return {
        name: player.name,
        average,
        rank,
    };
};


console.log(getPlayerStats({
    name: "Nova",
    scores: [90, 85, 95, 80]
}));



console.log(getPlayerStats({
    name: "Zex",
    scores: [60, 55, 70, 50]
}));
