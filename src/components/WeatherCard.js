import React, { useState } from 'react';
import { catppuccin } from '../constants/themes';
import { CircularIndicator } from './CircularIndicator';
import { WeatherGraph } from './WeatherGraph';

export const WeatherCard = ({ weather, forecast, theme, error }) => {
    const [showGraphs, setShowGraphs] = useState(true);
  
    if (error) {
        return (
            <div className="flex items-center justify-center p-8">
                <p className="text-red-500 text-xl">Error: {error}</p>
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
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-5xl font-bold mb-4"
                            style={{ color: catppuccin[theme].text }}>
                            {weather.name}
                        </h2>
                        <div className="flex items-center space-x-4">
                            <img
                                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                                alt={weather.weather[0].description}
                                className="w-20 h-20"
                            />
                            <span className="capitalize text-2xl"
                                  style={{ color: catppuccin[theme].subtext1 }}>
                                {weather.weather[0].description}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center gap-8 flex-wrap">
                    <CircularIndicator
                        value={Math.round(weather.main.temp)}
                        label="Temperature"
                        unit="°C"
                        color={catppuccin[theme].sapphire}
                        theme={theme}
                    />
                    <CircularIndicator
                        value={Math.round(weather.main.feels_like)}
                        label="Feels Like"
                        unit="°C"
                        color={catppuccin[theme].blue}
                        theme={theme}
                    />
                    <CircularIndicator
                        value={weather.main.humidity}
                        label="Humidity"
                        unit="%"
                        color={catppuccin[theme].sky}
                        theme={theme}
                    />
                    <CircularIndicator
                        value={Math.round(weather.wind.speed)}
                        label="Wind"
                        unit="m/s"
                        color={catppuccin[theme].lavender}
                        theme={theme}
                    />
                </div>
            </div>

            <div className="mt-4">
                <div className="mb-4 flex justify-between items-center">
                    <h3 className="text-3xl font-bold" 
                        style={{color: catppuccin[theme].text}}>
                        Forecast
                    </h3>
                    <button
                    onClick={() => setShowGraphs(!showGraphs)}
                    className="px-6 py-2 rounded transition-colors hover:opacity-90 text-lg"
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
                    <div className="flex flex-wrap justify-between">
                        <WeatherGraph
                            data={forecast.hourly}
                            dataKey="temp"
                            theme={theme}
                            label="Temperature (°C)"
                            color={catppuccin[theme].sapphire}
                        />
                        <WeatherGraph
                            data={forecast.hourly}
                            dataKey="humidity"
                            theme={theme}
                            label="Humidity (%)"
                            color={catppuccin[theme].blue}
                        />
                        <WeatherGraph
                            data={forecast.hourly}
                            dataKey="precipitation"
                            theme={theme}
                            label="Precipitation (mm)"
                            color={catppuccin[theme].sky}
                        />
                        <WeatherGraph
                            data={forecast.hourly}
                            dataKey="windSpeed"
                            theme={theme}
                            label="Wind Speed (m/s)"
                            color={catppuccin[theme].lavender}
                        />
                    </div>
                </div>
            )}
        </div>
    </div>
);
};


