type Light = 'red' | 'yellow' | 'green';

function getTrafficAction  (ligh: Light): string {
    if (ligh === 'red') {
        return 'Stop'
    } else if (ligh === "yellow") {
        return 'Slow Down'
    }
    return 'Go'
};


// console.log(getTrafficAction("red"));
// console.log(getTrafficAction("yellow"));
// console.log(getTrafficAction("green"));