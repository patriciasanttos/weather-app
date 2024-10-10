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

function TempWeek({ temperatureData }) {
  const currentDayIndex = new Date().getDay();

  const getWeatherIcon = (weather) => {
    if (weather === "rainy") {
      return Rainy;
    }
    if (weather === "sunnyRainy") {
      return SunnyRainy;
    }
    if (weather === "hailRain") {
      return HailRain;
    }
    if (weather === "sunny") {
      return Sunny;
    }
    if (weather === "storm") {
      return Storm;
    }
    if (weather === "covert") {
      return Covert;
    }
    if (weather === "cloudy") {
      return Cloudy;
    }
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

      {temperatureData.map((itemNoArray, index) => {
        const isToday = currentDayIndex === index;
        return (
          <div
            className={`temp-day ${isToday ? "highlight-today" : "faded-day"}`}
            key={index}
          >
            <h3>{itemNoArray.day}</h3>
            <p>{itemNoArray.date}</p>
            <img src={getWeatherIcon(itemNoArray.weather)} alt="" />
            <p>{itemNoArray.maxTemperature}</p>
            <p>{itemNoArray.minTemperature}</p>
          </div>
        );
      })}
    </section>
  );
}

export default TempWeek;
