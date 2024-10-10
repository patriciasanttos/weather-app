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



function App() {
  return (
    <>
      <Header
        city={testWeather.city}
        state={testWeather.state}
        date={testWeather.date}
      />

      <Weather weather={testWeather} />
      <TempWeek />
    </>
  );
}

export default App
