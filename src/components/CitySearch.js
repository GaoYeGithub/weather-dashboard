import React, { useState } from 'react';
import { catppuccin } from '../constants/themes';

export const CitySearch = ({ onSearch, theme }) => {
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
                    className="flex-1 px-4 py-2 rounded text-lg"
                    style={{
                        backgroundColor: catppuccin[theme].surface0,
                        color: catppuccin[theme].text,
                        border: `1px solid ${catppuccin[theme].overlay0}`
                    }}
                />
                <button
                    type="submit"
                    className="px-6 py-2 rounded transition-colors text-lg"
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
