import Header from './components/header/Header'
import Weather from './components/weather/Weather'
import TempWeek from "./components/tempWeek/TempWeek";
import { useEffect, useState } from 'react';
import { getIp } from './services/ip';
import { getCoordinates } from './services/coordinates';
import { getWeather } from './services/weather';
import getDates from './utils/getDates';
import formatWeatherData from './utils/formatWeatherData';

// const fakeWeather = {
//   city: 'São Paulo',
//   state: 'SP',
//   tempScale: 'C',
//   currentTemperature: 25,
//   minTemperature: 20,
//   maxTemperature: 28,
//   thermalSens: 27,
//   humidity: 30,
//   uvScale: 6,
//   rain: 0,
//   airPress: 1009,
//   wind: 9,
//   description: 'Sol',
//   date: new Date(Date.now())
// }

function App() {
  const [ location, setLocation ] = useState({});
  const [ daysOfMonth, setDaysOfMonth ] = useState([]);
  const [ currentDay, setCurrentDay ] = useState({});

  const [ isLoading, setIsLoading ] = useState(true);

  const getClientLocation = async () => {
    const clientIp = await getIp();
    const coordinates = await getCoordinates(clientIp);

    const clientLocation = {
      city: coordinates.city,
      state: coordinates.state_code.split('-')[1],
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
      date: new Date(Date.now())
    }

    return clientLocation;
  };

  const getClientWeather = async (clientLocation) => {
    const daysToGet = await getDates();
    const gettedDays = await getWeather(clientLocation.latitude, clientLocation.longitude, daysToGet);

    const formatedDataArray = [];
    for (const [ key, value ] of Object.entries(gettedDays)) {
      if (key === 'timezone')
        continue;

      if (key === 'current') {
        const newDate = formatWeatherData(key, {
          ...value,
          timezone: gettedDays.timezone
        });
  
        formatedDataArray.push({ ...newDate });
      } else {
        value.forEach((day) => {
          const newDate = formatWeatherData(key, {
            date: day.date,
            ...day.day,
            pressure_mb: day.hour[12].pressure_mb,
            timezone: gettedDays.timezone
          });
  
          formatedDataArray.push({ ...newDate });
        });
      }
    }
    
    const currentDayData = formatedDataArray.find(data => data.date === gettedDays.current.date);
    
    const sortDates = (array) => array.sort((a, b) => new Date(a.date) - new Date(b.date));

    return [ sortDates(formatedDataArray), currentDayData ];
  }

  useEffect(() => {
    const fetchData = async () => {
      const clientLocation = await getClientLocation();
      setLocation(clientLocation);

      const [ formatedDataArray, currentDayData ] = await getClientWeather(clientLocation);
      setDaysOfMonth([ ...formatedDataArray ]);
      setCurrentDay(currentDayData);

      setIsLoading(false);
    };

    fetchData();
  }, []);
  
  if (isLoading)
    return <div>Loading...</div>

  return (
    <>
      <Header 
        city={location.city}
        state={location.state}
        date={location.date}
      />

      <Weather weather={currentDay} />
      <TempWeek 
        daysOfMonth={daysOfMonth}
        currentDay={currentDay}
        setCurrentDay={setCurrentDay}
      />
    </>
  )
}

export default App
