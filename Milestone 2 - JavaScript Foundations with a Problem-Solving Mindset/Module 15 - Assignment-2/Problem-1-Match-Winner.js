function matchWinner(teamAGoals, teamBGoals) {
    // Write your code here
    if (typeof teamAGoals !== 'number' || typeof teamBGoals !== 'number'){
        return "Invalid";
    };
    if (teamAGoals > teamBGoals){
        return "Team A Won";
    } else if (teamBGoals > teamAGoals) {
        return "Team B Won";
    } else {
        return "Draw";
    }
}

// console.log(matchWinner(5, 6));
// console.log(matchWinner(3, 1));
// console.log(matchWinner(3, '1'));

