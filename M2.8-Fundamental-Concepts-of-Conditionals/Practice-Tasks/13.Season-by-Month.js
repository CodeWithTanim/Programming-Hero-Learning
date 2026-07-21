const month = 11;

if (month === 11 || month === 12){
    console.log("Spring");
} else if (month >= 1 && month <= 2){
    console.log("Summer");
} else if (month >= 3 && month <= 4){
    console.log("Rainy Season");
} else if (month >= 5 && month <= 6){
    console.log("Automn");
} else if (month >= 7 && month <= 8){
    console.log("Late Automn");
} else if (month >= 9 && month <= 10){
    console.log("Winter")
} else {
    console.log("Invalid Month")
}