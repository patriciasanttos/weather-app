import Header from './components/header/Header'
import Weather from './components/weather/Weather'
import TempWeek from "./components/tempWeek/TempWeek";

const testWeather = {
  city: 'São Paulo',
  state: 'SP',
  country: 'Brazil',
  description: 'sunny',
  humidity: 55,
  rain: 0,
  minTemperature: 18,
  maxTemperature: 27,
  currentTemperature: 24,
  thermalSens: 26,
  tempScale: 'C',
  uvScale: 'elevated',
  airPress: 1000,
  wind: 10,
  date: new Date(Date.now())
}

const temperatureData = [
  {
    day: "Dom",
    date: "06/10",
    maxTemperature: "25 Cº",
    minTemperature: "18 Cº",
    weather: "sunnyRainy",
  },
  {
    day: "Seg",
    date: "07/10",
    maxTemperature: "23 Cº",
    minTemperature: "18 Cº",
    weather: "rainy",
  },
  {
    day: "Ter",
    date: "08/10",
    maxTemperature: "29 Cº",
    minTemperature: "20 Cº",
    weather: "sunny",
  },
  {
    day: "Qua",
    date: "09/10",
    maxTemperature: "18 Cº",
    minTemperature: "15 Cº",
    weather: "storm",
  },
  {
    day: "Qui",
    date: "10/10",
    maxTemperature: "26 Cº",
    minTemperature: "19 Cº",
    weather: "cloudy",
  },
  {
    day: "Sex",
    date: "11/10",
    maxTemperature: "15 Cº",
    minTemperature: "10 Cº",
    weather: "covert",
  },
  {
    day: "Sáb",
    date: "12/10",
    maxTemperature: "22 Cº",
    minTemperature: "16 Cº",
    weather: "hailRain",
  },
  {
    day: "Dom",
    date: "13/10",
    maxTemperature: "22 Cº",
    minTemperature: "16 Cº",
    weather: "hailRain",
  },

  {
    day: "Seg",
    date: "14/10",
    maxTemperature: "22 Cº",
    minTemperature: "16 Cº",
    weather: "hailRain",
  },
];

function App() {
  return (
    <>
      <Header
        city={testWeather.city}
        state={testWeather.state}
        date={testWeather.date}
      />

      <Weather weather={testWeather} />
      <TempWeek temperatureData={temperatureData} />
    </>
  );
}

export default App
