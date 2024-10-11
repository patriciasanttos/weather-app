import './styles.scss';

import { hailRain, rainy, snowy, storm, sunny, sunnyRainy, windy } from '../../assets/weatherIcons';
import { useState } from 'react';
import { useEffect } from 'react';
import { night, starryNight, sunrise, sunset } from '../../assets/timeIcons';

function Weather({ weather }) {
  const [ currentWeather, setCurrentWeather ] = useState();

  const [ icon, setIcon ] = useState('');
  const [ hourIcon, setHourIcon ] = useState('');
  const hour = `${String(new Date().getHours()).padStart(2, '0')}:${String(new Date().getMinutes()).padStart(2, '0')}`;
  
  const loadIcons = (weather) => {
    const loadDescriptionIcon = () => {
      switch (weather.description) {
        case 'Ensolarado':
          setIcon(sunny);
          break;
        case 'hail rain':
          setIcon(hailRain);
          break;
        case 'sunny rainy':
          setIcon(sunnyRainy);
          break;
        case 'rainy':
          setIcon(rainy);
          break;
        case 'storm':
          setIcon(storm);
          break;
        case 'snowy':
          setIcon(snowy);
          break;
        case 'windy':
          setIcon(windy);
          break;
        default:
          setIcon(sunny);
      }
    }

    const loadHourIcon = () => {
      const currentHour = Number(hour.split(':')[0]);

      if (currentHour >= 0 && currentHour < 6)
        return setHourIcon(starryNight);
  
      if (currentHour >= 6 && currentHour < 16)
        return setHourIcon(sunrise);
  
      if (currentHour >= 16 && currentHour < 19)
        return setHourIcon(sunset);
  
      if (currentHour >= 19 && currentHour < 24)
        return setHourIcon(night);
    }

    loadDescriptionIcon();
    loadHourIcon();

    setCurrentWeather({
      ...weather,
      ...currentWeather
    })
  }

  useEffect(() => {
    loadIcons(weather);
  }, []);

  return (
    <div className="weather-container">
      <div className="weather-info">
        <div className="weather-temperature">
          <div className="weather-icon">
            <img src={icon} alt="" />
            <h2 className='weather-temperature-text'>
              {weather.currentTemperature} °{weather.tempScale}
            </h2>
          </div>
          <p className="weather-description">{weather.description}</p>
        </div>

        <div className="time">
          <div className="hour">
            <h2>{hour}</h2>
            <img src={hourIcon} alt="Horário" />
          </div>

          <p className='thermal-sens'>
            Sensação térmica: {weather.thermalSens} °{weather.tempScale}
          </p>
        </div>
      </div>
      <div className="additional-infos">
        <ul>
          <li>Min/Max: {weather.minTemperature}°/{weather.maxTemperature}°</li>
          <li>Chuva: {weather.rain}%</li>
          <li>Humidade: {weather.humidity}%</li>
        </ul>
        <ul>
          <li>Índice UV: {weather.uvScale}</li>
          <li>Pressão: {weather.airPress} mb</li>
          <li>Ventos: {weather.wind} km/h</li>
        </ul>
      </div>
    </div>
  );
}

export default Weather;