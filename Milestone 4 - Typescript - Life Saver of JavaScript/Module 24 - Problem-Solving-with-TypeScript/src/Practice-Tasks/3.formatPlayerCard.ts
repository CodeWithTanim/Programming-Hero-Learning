interface Player {
    username: string
    level: number
    region: string
}

function formatPlayerCard (player:Player) {
    return `${player.username} is a Level ${player.level} player from ${player.region}.`
}


console.log(formatPlayerCard({
    username: "ShadowByte",
    level: 42,
    region: "Asia"
}));
