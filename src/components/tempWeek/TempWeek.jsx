import "./TempWeek.scss";

// Assets
import ArrowTop from "../../assets/arrow_top.svg";
import ArrowDown from "../../assets/arrow_down.svg";
import SunnyRainy from "../../assets/sunny_rainy.svg";
import Rainy from "../../assets/rainy.svg";
import HailRain from "../../assets/hail_rain.svg";
import Sunny from "../../assets/sunny.svg";
import Storm from "../../assets/storm.svg";
import Covert from "../../assets/covert.svg";
import Cloudy from "../../assets/cloudy.svg";
import { useState } from "react";

const weekDays = {
  "Domingo": "Dom",
  "Segunda-feira": "Seg",
  "Terça-feira": "Ter",
  "Quarta-feira": "Qua",
  "Quinta-feira": "Qui",
  "Sexta-feira": "Sex",
  "Sábado": "Sab",
}

function TempWeek({ daysOfMonth, currentDay, setCurrentDay }) {
  const [ selectedDay, setSelectedDay ] = useState(currentDay.date);

  const getWeatherIcon = (weather) => {
    if (weather.toLowerCase().includes('chuva') || weather.toLowerCase().includes('aguaceiros')) {
      return Rainy;
    }
    if (weather.toLowerCase().includes('sol') && weather.toLowerCase().includes('chuva')) {
      return SunnyRainy;
    }
    if (weather.toLowerCase().includes('granizo')) {
      return HailRain;
    }
    if (weather.toLowerCase().includes('sol')) {
      return Sunny;
    }
    if (weather.toLowerCase().includes('tempestade') || (weather.toLowerCase().includes('chuva') && weather.toLowerCase().includes('forte'))) {
      return Storm;
    }
    if (weather.toLowerCase().includes('nublado') || weather.toLowerCase().includes('encoberto')) {
      return Covert;
    }
    if (weather.toLowerCase().includes('limpo')) {
      return Cloudy;
    }
  };

  const changeDay = (date) => {
    const currentDayData = daysOfMonth.find(data => data.date === date);

    setCurrentDay(currentDayData);
    setSelectedDay(date);
  };

  return (
    <section className="container-temp-week">
      <div className="max-min">
        <div className="f-row">
          <p>Máx</p>
          <img src={ArrowTop} alt="" />
        </div>
        <div className="f-row">
          <p>Mín</p>
          <img src={ArrowDown} alt="" />
        </div>
      </div>

      {daysOfMonth.map((date) => {
        const isSelectedDay = selectedDay === date.date;

        return (
          <div
            className={`temp-day ${isSelectedDay ? "highlight-today" : "faded-day"}`}
            key={date.date}
            onClick={() => changeDay(date.date)}
          >
            <h3>{weekDays[date.weekDayName]}</h3>
            <p>{date.date.slice(5)}</p>
            <img src={getWeatherIcon(date.description)} alt="" />
            <p>{date.maxTemperature} °{date.tempScale}</p>
            <p>{date.minTemperature} °{date.tempScale}</p>
          </div>
        );
      })}
    </section>
  );
}

export default TempWeek;
