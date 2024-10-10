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

function TempWeek() {
  const currentDayIndex = new Date().getDay();

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
  ];

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
