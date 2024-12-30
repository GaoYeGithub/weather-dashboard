import { useState, useEffect } from 'react';

export const useWeatherData = (city) => {
    const [weather, setWeather] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [error, setError] = useState(null);
    const OW_API_KEY = "71a09d53fe1618ac338bda7325e7f5e1";

    useEffect(() => {
        const fetchData = async () => {
            setError(null);
            try {
                const weatherResponse = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${OW_API_KEY}`
                );
              
                if (!weatherResponse.ok) {
                    throw new Error(`HTTP error! status: ${weatherResponse.status}`);
                }
              
                const weatherData = await weatherResponse.json();
                setWeather(weatherData);

                const { lat, lon } = weatherData.coord;

                const forecastResponse = await fetch(
                    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relativehumidity_2m,precipitation,windspeed_10m&timezone=auto`
                );
              
                if (!forecastResponse.ok) {
                    throw new Error(`HTTP error! status: ${forecastResponse.status}`);
                }
                const forecastData = await forecastResponse.json();

                const processedForecast = {
                    hourly: forecastData.hourly.time.slice(0, 24).map((time, index) => ({
                        time,
                        temp: forecastData.hourly.temperature_2m[index],
                        humidity: forecastData.hourly.relativehumidity_2m[index],
                        precipitation: forecastData.hourly.precipitation[index],
                        windSpeed: forecastData.hourly.windspeed_10m[index]
                    }))
                };

                setForecast(processedForecast);
            } catch (err) {
                console.error("Error fetching weather data:", err);
                setError(err.message);
            }
        };

        if (city) {
            fetchData();
        }
    }, [city]);

    return { weather, forecast, error };
};
