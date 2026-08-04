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