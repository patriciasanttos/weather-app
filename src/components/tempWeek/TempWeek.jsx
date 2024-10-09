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
  const temperatureData = [
    {
      day: "Dom",
      maxTemperature: "25 Cº",
      minTemperature: "18 Cº",
      weather: "sunnyRainy",
    },
    {
      day: "Seg",
      maxTemperature: "23 Cº",
      minTemperature: "18 Cº",
      weather: "rainy",
    },
    {
      day: "Ter",
      maxTemperature: "29 Cº",
      minTemperature: "20 Cº",
      weather: "sunny",
    },
    {
      day: "Qua",
      maxTemperature: "18 Cº",
      minTemperature: "15 Cº",
      weather: "storm",
    },
    {
      day: "Qui",
      maxTemperature: "26 Cº",
      minTemperature: "19 Cº",
      weather: "cloudy",
    },
    {
      day: "Sex",
      maxTemperature: "15 Cº",
      minTemperature: "10 Cº",
      weather: "covert",
    },
    {
      day: "Sáb",
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
        return (
          <div className="temp-day" key={index}>
            <h3>{itemNoArray.day}</h3>
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
