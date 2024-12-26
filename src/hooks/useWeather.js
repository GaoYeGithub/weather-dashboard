import { useState, useEffect } from "react";
import axios from "axios";

const useWeather = (city) => {
  const [weather, setWeather] = useState(null);
  const API_KEY = "71a09d53fe1618ac338bda7325e7f5e1";

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        );
        setWeather(response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeather();
  }, [city]);

  return weather;
};

export default useWeather;
