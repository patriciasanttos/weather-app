import axios from 'axios';

export async function getWeather(lat, lon, daysToGet) {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

    const history = await axios
        .get(
            `https://api.weatherapi.com/v1/history.json?key=${apiKey}&q=${lat},${lon}&lang=pt&dt=${daysToGet.daysBefore}&end_dt=${daysToGet.yesterday}`
        )
        .catch(error => console.error('Weather/Error:', error))

    const forecast = await axios
        .get(
            `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${lon}&lang=pt&days=14`
        )
        .catch(error => console.error('Weather/Error:', error))

    return {
        history: history.data.forecast.forecastday,
        forecast: forecast.data.forecast.forecastday.slice(1),
        current: {
            ...forecast.data.current,
            date: forecast.data.forecast.forecastday[0].date,
            mintemp_c: forecast.data.forecast.forecastday[0].day.mintemp_c,
            maxtemp_c: forecast.data.forecast.forecastday[0].day.maxtemp_c,
            rain: forecast.data.forecast.forecastday[0].day.daily_chance_of_rain
        },
        location: {
            city: forecast.data.location.name,
            state: forecast.data.location.region,
            timezone: forecast.data.location.tz_id,
        }
    }
}