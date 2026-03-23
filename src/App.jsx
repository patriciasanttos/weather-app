import { useEffect, useRef, useState } from "react";

import Header from "./components/header/Header";
import Weather from "./components/weather/Weather";
import TempWeek from "./components/tempWeek/TempWeek";

import { getIp } from "./services/ip";
import { getCoordinates } from "./services/coordinates";
import { getWeather } from "./services/weather";

import getDates from "./utils/getDates";
import formatWeatherData from "./utils/formatWeatherData";
import SearchBar from "./components/header/searchbar/SearchBar";
import Loading from "./components/loading/Loading";

function App() {
  const [initialLocation, setInitialLocation] = useState();
  const [location, setLocation] = useState();

  const [daysOfMonth, setDaysOfMonth] = useState([]);
  const [currentDay, setCurrentDay] = useState();

  const [isLoading, setIsLoading] = useState(true);
  const isFirstRender = useRef(true);

  const getClientLocation = async () => {
    try {
      const position = await new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
          reject(new Error("Geolocation not supported"));
          return;
        }
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        });
      });

      return {
        city: null,
        state: null,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        date: new Date(Date.now()),
        usedBrowserGeolocation: true,
      };
    } catch (error) {
      console.log("Browser geolocation denied/unavailable, using IP fallback.");
      const clientIp = await getIp();
      const coordinates = await getCoordinates(clientIp);

      return {
        city: coordinates.city,
        state: coordinates.state_code.split("-")[1],
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
        date: new Date(Date.now()),
      };
    }
  };

  const getClientWeather = async (clientLocation) => {
    const daysToGet = await getDates();
    const gettedDays = await getWeather(
      clientLocation.latitude,
      clientLocation.longitude,
      daysToGet,
    );

    const formatedDataArray = [];
    for (const [key, value] of Object.entries(gettedDays)) {
      if (key === "location") continue;

      if (key === "current") {
        const newDate = formatWeatherData(key, {
          ...value,
          timezone: gettedDays.location.timezone,
        });

        formatedDataArray.push({ ...newDate });
      } else {
        value.forEach((day) => {
          const newDate = formatWeatherData(key, {
            date: day.date,
            ...day.day,
            pressure_mb: day.hour[12].pressure_mb,
            timezone: gettedDays.location.timezone,
          });

          formatedDataArray.push({ ...newDate });
        });
      }
    }

    const currentDayData = formatedDataArray.find(
      (data) => data.date === gettedDays.current.date,
    );

    const sortDates = (array) =>
      array.sort((a, b) => new Date(a.date) - new Date(b.date));

    return {
      formatedDataArray: sortDates(formatedDataArray),
      currentDayData: currentDayData,
      locationInfo: gettedDays.location,
    };
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      const clientLocation = await getClientLocation();

      const { formatedDataArray, currentDayData, locationInfo } =
        await getClientWeather(clientLocation);

      if (clientLocation.usedBrowserGeolocation && locationInfo) {
        clientLocation.city = locationInfo.city;
        clientLocation.state = locationInfo.state;
      }

      setInitialLocation(clientLocation);
      setDaysOfMonth([...formatedDataArray]);
      setCurrentDay(currentDayData);

      setIsLoading(false);
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (location) {
      const changeLocation = async () => {
        setIsLoading(true);

        const { formatedDataArray, currentDayData } = await getClientWeather({
          latitude: location?.lat,
          longitude: location?.lon,
        });
        setDaysOfMonth([...formatedDataArray]);
        setCurrentDay(currentDayData);

        return setIsLoading(false);
      };

      changeLocation();
    }
  }, [location]);

  if (isLoading) return <Loading />;

  return (
    <>
      <Header
        city={location ? location.city : initialLocation.city}
        state={location ? location.state : initialLocation.state}
        date={location ? location.date : initialLocation.date}
      >
        <SearchBar setLocation={setLocation} />
      </Header>

      <Weather weather={currentDay} />
      <TempWeek
        daysOfMonth={daysOfMonth}
        currentDay={currentDay}
        setCurrentDay={setCurrentDay}
      />
    </>
  );
}

export default App;
