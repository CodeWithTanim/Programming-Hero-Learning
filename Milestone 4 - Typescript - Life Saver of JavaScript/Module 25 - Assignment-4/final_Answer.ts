//Problem-01: Battery Level Status
function getBatteryStatus(percentage: number): string {
    if (percentage < 0 || percentage > 100) {
        return 'Invalid';
    }
    if (percentage <= 20) {
        return 'Low'
    } else if (percentage <= 50) {
        return 'Medium'
    } else if (percentage <= 90) {
        return 'High'
    }
    return 'Full'
}


// console.log(getBatteryStatus(10));
// console.log(getBatteryStatus(35));
// console.log(getBatteryStatus(75));
// console.log(getBatteryStatus(100));
// console.log(getBatteryStatus(-20));
// console.log(getBatteryStatus(120));


//Problem-02: Table Booking Confirmation
interface Booking {
    name: string
    guests: number
    time: string
}

function formatBookingConfirmation(booking: Booking): string {
    return `${booking.name}'s table for ${booking.guests} guests is confirmed at ${booking.time}.`;
};

console.log(formatBookingConfirmation({ name: "Aisha", guests: 4, time: "7:00 PM" }));
console.log(formatBookingConfirmation({ name: "Rahim", guests: 2, time: "8:30 PM" }));


//Problem-03: Weekly Expense Tracker
function calculateWeeklyTotal (expenses: number[]): number {
    return expenses.reduce ((total, expense) => total + expense, 0)
}



// console.log(calculateWeeklyTotal([200, 450, 100]));
// console.log(calculateWeeklyTotal([1000, 250]));
// console.log(calculateWeeklyTotal([]));

//Problem-04: Traffic Light Action
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

//Problem-05: Quiz Score Summary
interface QuizSummary {
    total: number
    average: number
}


function getQuizSummary (scores: number[]): QuizSummary {
    const total = scores.reduce((sum, score) => sum + score, 0);

    if (scores.length === 0) {
        return {
            total: 0,
            average: 0
        };
    };

    const average = total / scores.length;

    return {
        total,
        average
    };
};

// console.log(getQuizSummary([8, 9, 7, 10]));
// console.log(getQuizSummary([5, 5]));
// console.log(getQuizSummary([]));

