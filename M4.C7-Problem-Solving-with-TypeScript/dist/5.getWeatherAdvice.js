"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getWeatherAdvice(weather) {
    if (weather === 'sunny') {
        return 'Wear sunscreen';
    }
    else if (weather === 'rainy') {
        return 'Carry an Umbrella';
    }
    return 'Bring a light jacket';
}
console.log(getWeatherAdvice("sunny"));
console.log(getWeatherAdvice("rainy"));
console.log(getWeatherAdvice("cloudy"));
//# sourceMappingURL=5.getWeatherAdvice.js.map