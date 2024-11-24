import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = () => {
    if (city) {
      setLoading(true);
      setWeatherData(null);

      axios
        .get("https://api.weatherapi.com/v1/current.json", {
          params: {
            key: "cf6cae627141447e9e6113102230410",
            q: city,
          },
        })
        .then((response) => setWeatherData(response.data))
        .catch(() => alert("Failed to fetch weather data"))
        .finally(() => setLoading(false));
    }
  };

  return (
    <div className="App">
      <div className="search-bar">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button onClick={fetchWeather}>Search</button>
      </div>

      <div className="weather-display">
        {loading && <p>Loading data...</p>}
        {weatherData && (
          <div className="weather-cards">
            <div className="weather-card">
              <h3>Temperature</h3>
              <p>{weatherData.current.temp_c}°C</p>
            </div>
            <div className="weather-card">
              <h3>Humidity</h3>
              <p>{weatherData.current.humidity}%</p>
            </div>
            <div className="weather-card">
              <h3>Condition</h3>
              <p>{weatherData.current.condition.text}</p>
            </div>
            <div className="weather-card">
              <h3>Wind Speed</h3>
              <p>{weatherData.current.wind_kph} kph</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
