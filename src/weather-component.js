import { useState } from "react";
import "./search.css";
import "./weather.css";

const Weather = () => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const searchLocation = (e) => {
    if (location && e.key === "Enter") {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${ApiKey}`
      )
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          console.log(response);
          setData(response);
        })
        .catch((err) => console.log(err));
      setLocation("");
    }
  };

  return (
    <div>
      <div className="search">
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyDown={searchLocation}
          placeholder="Enter City"
          type="text"
        />
      </div>
      {data.name && <div className="weather">
        <div className="top">
          <div>
            <p className="city">{data.name}</p>
            <p className="weather-desc">{data.weather[0].description}</p>
          </div>
          <img src={`/icons/${data.weather[0].icon}.png`} alt="weather" className="weather-icon" />
        </div>
        <div className="bottom">
          <p className="temp">{Math.round(data.main.temp)}°C</p>
          <div className="details">
            <div className="details-row main">
              <span className="details-label">Details:</span>
            </div>
            <div className="details-row">
              <span className="details-label">Feels like</span>
              <span className="details-value">{Math.round(data.main.feels_like)}°C</span>
            </div>
            <div className="details-row">
              <span className="details-label">Wind</span>
              <span className="details-value">{data.wind.speed} m/s</span>
            </div>
            <div className="details-row">
              <span className="details-label">Humidity</span>
              <span className="details-value">{data.main.humidity}%</span>
            </div>
            <div className="details-row">
              <span className="details-label">Pressure</span>
              <span className="details-value">{data.main.pressure} hPa</span>
            </div>
          </div>
        </div>
      </div>}
    </div>
  );
};

export default Weather;
