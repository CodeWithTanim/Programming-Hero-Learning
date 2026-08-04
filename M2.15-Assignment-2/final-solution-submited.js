//Problem-01: Match Winner
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



//Problem-02: Elevator Weight Safety Checker
function isElevatorSafe(weights) {
  // Write your code here

  if (!Array.isArray(weights)) {
    return "Invalid";
  }
  
  let totalWeight = 0;

  for (let i = 0; i < weights.length; i++) {
    totalWeight += weights[i];

  }

  if (totalWeight <= 400) {
    return true;

  } else{
    return false;
  }

}


// console.log(isElevatorSafe([60,75,50]));
// console.log(isElevatorSafe([90,100,95,120]));
// console.log(isElevatorSafe([400]));
// console.log(isElevatorSafe("60,75,50"));

//Problem-03: AI Token Cost Calculator
function calculateAiCost(tokensUsed) {
 // Write your code here.
    if (typeof tokensUsed !== 'number' || tokensUsed < 0){
        return 'Invalid';
        
    }
    if (tokensUsed <= 500) {
        return 0;
    };

    let extraToken = tokensUsed - 500;
    let charges = Math.floor(extraToken / 100) * 5;

    return charges;
}


// console.log(calculateAiCost(300));
// console.log(calculateAiCost(650));
// console.log(calculateAiCost(1000));
// console.log(calculateAiCost(-10));

//Problem-04: Top Rated Restaurant Finder
function topRatedRestaurant(restaurants) {
    // Write your code here
    if(!Array.isArray(restaurants)|| restaurants.length ===0){
        return "Invalid";
    };
    let highestRatedRestaurant = restaurants[0];

    for (const restaurant of restaurants){
        if( restaurant.rating > highestRatedRestaurant.rating) {
            highestRatedRestaurant = restaurant;
        }
    };

    return highestRatedRestaurant.name.toUpperCase();
}


// console.log(topRatedRestaurant([{name:"Chillox", rating:4.5}, {name:"Sultan's Dine", rating:4.8}]));

//Problem-05: Debugging Challenge - API Response Time Monitor
/* এই ফাংশনের সব বাগ খুঁজে ঠিক করো — নাম পরিবর্তন করবে না */
function averageResponseTime(times) {
    if (Array.isArray(times) === false) {
        return "Invalid";
    }

    if (times.length === 0) {
        return "Invalid";
    }

    let total = 0;
    for (let i = 0; i < times.length; i++) {

        if (typeof times[i] !== 'number'){
            return 'Invalid';
        }

        total = total + times[i];
    }

    return total / times.length;
}


// console.log(averageResponseTime([50,100,150]));

