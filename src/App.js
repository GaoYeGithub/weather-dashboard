import React, { useState, useEffect } from 'react';
import { Line, XAxis, YAxis, Tooltip, LineChart } from 'recharts';

const catppuccin = {
    latte: {
        base: '#eff1f5',
        mantle: '#e6e9ef',
        crust: '#dce0e8',
        text: '#4c4f69',
        subtext1: '#5c5f77',
        surface0: '#ccd0da',
        surface1: '#bcc0cc',
        overlay0: '#9ca0b0',
        blue: '#1e66f5',
        lavender: '#7287fd',
        sapphire: '#209fb5',
        sky: '#04a5e5'
    },
    frappe: {
        base: '#303446',
        mantle: '#292c3c',
        crust: '#232634',
        text: '#c6d0f5',
        subtext1: '#b5bfe2',
        surface0: '#414559',
        surface1: '#51576d',
        overlay0: '#737994',
        blue: '#8caaee',
        lavender: '#babbf1',
        sapphire: '#85c1dc',
        sky: '#99d1db'
    },
    macchiato: {
        base: '#24273a',
        mantle: '#1e2030',
        crust: '#181926',
        text: '#cad3f5',
        subtext1: '#b8c0e0',
        surface0: '#363a4f',
        surface1: '#494d64',
        overlay0: '#6e738d',
        blue: '#8aadf4',
        lavender: '#b7bdf8',
        sapphire: '#7dc4e4',
        sky: '#91d7e3'
    },
    mocha: {
        base: '#1e1e2e',
        mantle: '#181825',
        crust: '#11111b',
        text: '#cdd6f4',
        subtext1: '#bac2de',
        surface0: '#313244',
        surface1: '#45475a',
        overlay0: '#6c7086',
        blue: '#89b4fa',
        lavender: '#b4befe',
        sapphire: '#74c7ec',
        sky: '#89dceb'
    }
};

const formatTime = (dateStr) => {
    return new Date(dateStr).toLocaleTimeString('en-US', {
        hour: 'numeric',
        hour12: true
    });
};

const Sidebar = ({ theme, onThemeChange }) => {
    const themes = ['latte', 'frappe', 'macchiato', 'mocha'];
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };


    return (
        <div className="h-screen p-6"
             style={{ backgroundColor: catppuccin[theme].mantle }}>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold"
                    style={{ color: catppuccin[theme].text }}>
                    Weather App
                </h1>
                <button onClick={toggleMenu} className="focus:outline-none">
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke={catppuccin[theme].text}
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                </button>
            </div>
            <div className={`space-y-3 ${isMenuOpen ? '' : 'hidden'}`}>
                {themes.map(themeName => (
                    <button
                        key={themeName}
                        onClick={() => {
                            onThemeChange(themeName);
                            setIsMenuOpen(false);
                        }}
                        className={`block w-full text-left px-4 py-2 rounded transition-colors
                          ${theme === themeName ? 'font-bold' : ''}`}
                        style={{
                            backgroundColor: theme === themeName ? catppuccin[theme].surface0 : 'transparent',
                            color: catppuccin[theme].text
                        }}
                    >
                        {themeName.charAt(0).toUpperCase() + themeName.slice(1)}
                    </button>
                ))}
            </div>
        </div>
    );
};

const CircularIndicator = ({ value, label, unit, color, theme }) => (
    <div className="flex flex-col items-center">
        <div className="relative w-24 h-24">
            <svg className="w-24 h-24 transform -rotate-90">
                <circle
                    cx="48"
                    cy="48"
                    r="45"
                    fill="transparent"
                    stroke={catppuccin[theme].surface0}
                    strokeWidth="6"
                />
                <circle
                    cx="48"
                    cy="48"
                    r="45"
                    fill="transparent"
                    stroke={color}
                    strokeWidth="6"
                    strokeDasharray={`${value * 2.827433388230814} 282.7433388230814`}
                    strokeLinecap="round"
                />
            </svg>
            <div
                className="absolute inset-0 flex flex-col items-center justify-center"
                style={{ color: catppuccin[theme].text }}
            >
                <span className="text-xl font-bold">{value}{unit}</span>
                <span className="text-sm">{label}</span>
            </div>
        </div>
    </div>
);

const WeatherChart = ({ data, dataKey, theme, label }) => {
    if (!data) return null;

    return (
        <div className="w-full h-64 mt-4">
            <LineChart
                width={800}
                height={250}
                data={data}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
                <XAxis
                    dataKey="time"
                    tick={{ fill: catppuccin[theme].text }}
                    tickFormatter={formatTime}
                />
                <YAxis tick={{ fill: catppuccin[theme].text }} />
                <Tooltip
                    contentStyle={{
                        backgroundColor: catppuccin[theme].surface0,
                        border: 'none',
                        borderRadius: '0.5rem',
                        color: catppuccin[theme].text
                    }}
                    formatter={(value) => [`${value}${dataKey === 'temp' ? '°C' : '%'}`, label]}
                />
                <Line
                    type="monotone"
                    dataKey={dataKey}
                    stroke={catppuccin[theme].blue}
                    dot={false}
                />
            </LineChart>
        </div>
    );
};


const WeatherCard = ({ weather, forecast, theme, error }) => {
    const [showGraphs, setShowGraphs] = useState(true);
  
    if (error) {
        return (
            <div className="flex items-center justify-center p-8">
              <p className="text-red-500">Error: {error}</p>
            </div>
        );
    }
  
    if (!weather || !forecast) return (
        <div className="flex items-center justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2"
                 style={{ borderColor: catppuccin[theme].blue }}/>
        </div>
    );

    return (
        <div className="space-y-6">
            <div className="p-6 rounded-lg shadow-lg"
                 style={{ backgroundColor: catppuccin[theme].surface0 }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h2 className="text-3xl font-bold mb-4"
                            style={{ color: catppuccin[theme].text }}>
                            {weather.name}
                        </h2>
                        <div className="flex items-center space-x-4 mb-6">
                            <span className="text-5xl font-bold"
                                  style={{ color: catppuccin[theme].text }}>
                                {Math.round(weather.main.temp)}°C
                            </span>
                            <div>
                                <img
                                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                                    alt={weather.weather[0].description}
                                    className="w-16 h-16"
                                />
                                <span className="capitalize"
                                      style={{ color: catppuccin[theme].subtext1 }}>
                                    {weather.weather[0].description}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <CircularIndicator
                            value={weather.main.humidity}
                            label="Humidity"
                            unit="%"
                            color={catppuccin[theme].blue}
                            theme={theme}
                        />
                        <CircularIndicator
                            value={Math.round(weather.wind.speed)}
                            label="Wind"
                            unit="m/s"
                            color={catppuccin[theme].sapphire}
                            theme={theme}
                        />
                        <CircularIndicator
                            value={Math.round(weather.main.feels_like)}
                            label="Feels Like"
                            unit="°C"
                            color={catppuccin[theme].lavender}
                            theme={theme}
                        />
                        <CircularIndicator
                            value={Math.round(weather.main.pressure / 10)}
                            label="Pressure"
                            unit="kPa"
                            color={catppuccin[theme].sky}
                            theme={theme}
                        />
                    </div>
                </div>
            </div>

          <div className="mt-4">
              <div className="mb-4 flex justify-between items-center">
                <h3 className="text-xl font-bold" style={{color: catppuccin[theme].text}}>
                  Forecast
                </h3>
                <button
                  onClick={() => setShowGraphs(!showGraphs)}
                  className="px-4 py-2 rounded transition-colors"
                   style={{
                       backgroundColor: catppuccin[theme].blue,
                       color: catppuccin[theme].base
                   }}
                >
                  {showGraphs ? 'Hide Graphs' : 'Show Graphs'}
                  </button>
              </div>
              {showGraphs && (
                <div className="space-y-6">
                  <div className="p-6 rounded-lg shadow-lg"
                       style={{ backgroundColor: catppuccin[theme].surface0 }}>
                    <h3 className="text-xl font-bold mb-4"
                        style={{ color: catppuccin[theme].text }}>
                      Temperature Forecast
                    </h3>
                    <WeatherChart
                      data={forecast.hourly}
                      dataKey="temp"
                      theme={theme}
                      label="Temperature"
                    />
                  </div>

                  <div className="p-6 rounded-lg shadow-lg"
                       style={{ backgroundColor: catppuccin[theme].surface0 }}>
                    <h3 className="text-xl font-bold mb-4"
                        style={{ color: catppuccin[theme].text }}>
                      Humidity Forecast
                    </h3>
                    <WeatherChart
                      data={forecast.hourly}
                      dataKey="humidity"
                      theme={theme}
                      label="Humidity"
                    />
                  </div>
                </div>
              )}
            </div>
        </div>
    );
};



const CitySearch = ({ onSearch, theme }) => {
    const [city, setCity] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (city.trim()) {
            onSearch(city.trim());
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-6">
            <div className="flex space-x-2">
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter city name"
                    className="flex-1 px-4 py-2 rounded"
                    style={{
                        backgroundColor: catppuccin[theme].surface0,
                        color: catppuccin[theme].text,
                        border: `1px solid ${catppuccin[theme].overlay0}`
                    }}
                />
                <button
                    type="submit"
                    className="px-4 py-2 rounded transition-colors"
                    style={{
                        backgroundColor: catppuccin[theme].blue,
                        color: catppuccin[theme].base
                    }}
                >
                    Get Weather
                </button>
            </div>
        </form>
    );
};

const useWeatherData = (city) => {
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
                  const message = `HTTP error! status: ${weatherResponse.status}`;
                  throw new Error(message);
                }
              
                const weatherData = await weatherResponse.json();
                setWeather(weatherData);

                const { lat, lon } = weatherData.coord;

                const forecastResponse = await fetch(
                    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relativehumidity_2m&timezone=auto`
                );
              
                if (!forecastResponse.ok) {
                    const message = `HTTP error! status: ${forecastResponse.status}`;
                  throw new Error(message);
                }
                const forecastData = await forecastResponse.json();

                const processedForecast = {
                  hourly: forecastData.hourly.time.slice(0, 24).map((time, index) => ({
                    time,
                    temp: forecastData.hourly.temperature_2m[index],
                    humidity: forecastData.hourly.relativehumidity_2m[index]
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


const App = () => {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('appTheme') || 'mocha';
    });
    const [city, setCity] = useState('Toronto');
    const { weather, forecast, error } = useWeatherData(city);

    useEffect(() => {
        localStorage.setItem('appTheme', theme);
    }, [theme]);

    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-[250px_1fr]"
             style={{ backgroundColor: catppuccin[theme].base }}>
            <Sidebar theme={theme} onThemeChange={setTheme} />
            <main className="p-6">
                <CitySearch onSearch={setCity} theme={theme} />
                <WeatherCard weather={weather} forecast={forecast} theme={theme} error={error}/>
            </main>
        </div>
    );
};

export default App;
