import React, { useState, useEffect } from 'react';
import { catppuccin } from './constants/themes';
import { useWeatherData } from './hooks/useWeatherData';
import { Sidebar } from './components/Sidebar';
import { CitySearch } from './components/CitySearch';
import { WeatherCard } from './components/WeatherCard';

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
