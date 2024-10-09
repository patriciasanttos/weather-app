import './styles.scss';

import { hailRain, rainy, snowy, storm, sunny, sunnyRainy, windy } from '../../assets/weatherIcons';
import { useState } from 'react';
import { useEffect } from 'react';
import { night, starryNight, sunrise, sunset } from '../../assets/timeIcons';

function Weather({ weather }) {
  const [ currentWeather, setCurrentWeather ] = useState(weather);

  const [ icon, setIcon ] = useState('');
  const [ hourIcon, setHourIcon ] = useState('');
  const hour = `${String(new Date().getHours()).padStart(2, '0')}:${String(new Date().getMinutes()).padStart(2, '0')}`;
  
  const loadInitialFormats = (weather) => {
    const loadDescription = () => {
      switch (weather.description) {
        case 'sunny':
          setIcon(sunny);
          setCurrentWeather({ ...currentWeather, description: 'Ensolarado'});
          break;
        case 'hail rain':
          setIcon(hailRain);
          setCurrentWeather({ ...currentWeather, description: 'Chuva de granizo'});
          break;
        case 'sunny rainy':
          setIcon(sunnyRainy);
          setCurrentWeather({ ...currentWeather, description: 'Chuva convectiva' });
          break;
        case 'rainy':
          setIcon(rainy);
          setCurrentWeather({ ...currentWeather, description: 'Chuva' });
          break;
        case 'storm':
          setIcon(storm);
          setCurrentWeather({ ...currentWeather, description: 'Tempestade' });
          break;
        case 'snowy':
          setIcon(snowy);
          setCurrentWeather({ ...currentWeather, description: 'Neve' });
          break;
        case 'windy':
          setIcon(windy);
          setCurrentWeather({ ...currentWeather, description: 'Ventania' });
          break;
        default:
          setIcon(sunny);
          setCurrentWeather({ ...currentWeather, description: 'Ensolarado'});
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

    const loadUvScale = () => {
      switch (weather.uvScale) {
        case 'minimum':
          setCurrentWeather({ ...currentWeather, uvScale: 'Mínima' });
          break;
        case 'low':
          setCurrentWeather({ ...currentWeather, uvScale: 'Baixa'});
          break;
        case 'elevated':
          setCurrentWeather({ ...currentWeather, uvScale: 'Elevada'});
          break;
        case 'extreme':
          setCurrentWeather({ ...currentWeather, uvScale: 'Extrema' });
          break;
        default:
          setCurrentWeather({ ...currentWeather, uvScale: 'Baixa'});
      }
    }

    loadDescription();
    loadHourIcon();
    loadUvScale();
  }

  useEffect(() => {
    loadInitialFormats(weather);
  }, []);

  return (
    <div className="weather-container">
      <div className="weather-info">
        <div className="weather-temperature">
          <div className="weather-icon">
            <img src={icon} alt="" />
            <h2 className='weather-temperature-text'>{currentWeather.currentTemperature} °{currentWeather.tempScale}</h2>
          </div>
          <p className="weather-description">{currentWeather.description}</p>
        </div>

        <div className="time">
          <div className="hour">
            <h2>{hour}</h2>
            <img src={hourIcon} alt="Horário" />
          </div>

          <p className='thermal-sens'>Sensação térmica: {currentWeather.thermalSens} °{currentWeather.tempScale}</p>
        </div>
      </div>
      <div className="additional-infos">
        <ul className="left">
          <li>Min/Max: {currentWeather.minTemperature}°/{currentWeather.maxTemperature}°</li>
          <li>Chuva: {currentWeather.rain}%</li>
          <li>Humidade: {currentWeather.humidity}%</li>
        </ul>
        <ul className="right">
          <li>Índice UV: {currentWeather.uvScale}</li>
          <li>Pressão: {currentWeather.airPress} mb</li>
          <li>Ventos: {currentWeather.wind} km/h</li>
        </ul>
      </div>
    </div>
  );
}

export default Weather;