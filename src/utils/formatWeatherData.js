export default function formatWeatherData(type, data) {
  let uvScale = '';

  if (data?.uvScale <= 2 || data?.uv <= 2)
    uvScale = 'Baixo';
  if ((data?.uvScale >= 3 && data?.uvScale <= 5) || (data?.uv >= 3 && data?.uv <= 5))
    uvScale = 'Moderado'
  if ((data?.uvScale >= 6 && data?.uvScale <= 7) || (data?.uv >= 6 && data?.uv <= 7))
    uvScale = 'Alto'
  if ((data?.uvScale >= 8 && data?.uvScale <= 10) || (data?.uv >= 8 && data?.uv <= 10))
    uvScale = 'Muito alto'
  if (data?.uvScale >= 11 || data?.uv >= 11)
    uvScale = 'Extremo'

  if (type === 'current')
    return {
      date: data.date,
      tempScale: 'C',
      currentTemperature: String(data.temp_c).split('.')[0],
      minTemperature: String(data.mintemp_c).split('.')[0],
      maxTemperature: String(data.maxtemp_c).split('.')[0],
      thermalSens: data.feelslike_c,
      humidity: data.humidity,
      uvScale,
      rain: data.rain,
      airPress: data.pressure_mb,
      wind: data.wind_kph,
      description: data.condition.text,
    };

  return {
    date: data.date,
    tempScale: 'C',
    avgTemp: String(data.avgtemp_c).split('.')[0],
    minTemperature: String(data.mintemp_c).split('.')[0],
    maxTemperature: String(data.maxtemp_c).split('.')[0],
    humidity: data.humidity,
    uvScale,
    rain: data.daily_chance_of_rain,
    airPress: data.pressure_mb,
    wind: data.maxwind_kph,
    description: data.condition.text,
  }
}