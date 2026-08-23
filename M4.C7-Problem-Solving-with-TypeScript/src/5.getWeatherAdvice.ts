type WeatherCondition = 'sunny' | 'rainy' | 'cloudy'

function getWeatherAdvice (weather: WeatherCondition): string {
    if (weather === 'sunny') {
        return 'Wear sunscreen'
    } else if (weather === 'rainy') {
        return 'Carry an Umbrella'
    }
    return 'Bring a light jacket'
}

console.log(getWeatherAdvice("sunny"));
console.log(getWeatherAdvice("rainy"));
console.log(getWeatherAdvice("cloudy"));