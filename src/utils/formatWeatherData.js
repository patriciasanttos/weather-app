import { utcToZonedTime } from 'date-fns-tz';

export default function formatWeatherData(type, data) {
  let uvScale = '';
  //-----Define UV scale level
  if (data?.uvScale < 3 || data?.uv < 3)
    uvScale = 'Baixo';
  if ((data?.uvScale >= 3 && data?.uvScale < 6) || (data?.uv >= 3 && data?.uv < 6))
    uvScale = 'Moderado'
  if ((data?.uvScale >= 6 && data?.uvScale < 8) || (data?.uv >= 6 && data?.uv < 8))
    uvScale = 'Alto'
  if ((data?.uvScale >= 8 && data?.uvScale <= 10) || (data?.uv >= 8 && data?.uv <= 10))
    uvScale = 'Muito alto'
  if (data?.uvScale >= 11 || data?.uv >= 11)
    uvScale = 'Extremo'

  //-----Get date name in the week
  function getWeekDayName(dateString, timezone) {
    const date = new Date(`${dateString}T12:00:00Z`);
    const zonedDate = utcToZonedTime(date, timezone);

    const daysOfWeek = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];

    return daysOfWeek[zonedDate.getDay()];
  }
  const weekDayName = getWeekDayName(data.date, data.timezone);

  //-----Current data object
  if (type === 'current')
    return {
      date: data.date,
      weekDayName,
      tempScale: 'C',
      currentTemperature: String(data.temp_c).split('.')[0],
      minTemperature: String(data.mintemp_c).split('.')[0],
      maxTemperature: String(data.maxtemp_c).split('.')[0],
      thermalSens: String(data.feelslike_c).split('.')[0],
      humidity: data.humidity,
      uvScale,
      rain: data.rain,
      airPress: data.pressure_mb,
      wind: data.wind_kph,
      description: data.condition.text,
    };

  return {
    date: data.date,
    weekDayName,
    tempScale: 'C',
    avgTemp: String(data.avgtemp_c).split('.')[0],
    minTemperature: String(data.mintemp_c).split('.')[0],
    maxTemperature: String(data.maxtemp_c).split('.')[0],
    humidity: data.avghumidity,
    uvScale,
    rain: data.daily_chance_of_rain,
    airPress: data.pressure_mb,
    wind: data.maxwind_kph,
    description: data.condition.text,
  }
}