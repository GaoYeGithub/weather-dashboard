import React, { useState } from 'react';
import { catppuccin } from '../constants/themes';

export const Sidebar = ({ theme, onThemeChange }) => {
    const themes = ['latte', 'frappe', 'macchiato', 'mocha'];
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="h-screen p-6"
             style={{ backgroundColor: catppuccin[theme].mantle }}>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-4xl font-bold"
                    style={{ color: catppuccin[theme].text }}>
                    Weather App
                </h1>
                <button onClick={toggleMenu} className="focus:outline-none">
                    <svg
                        className="w-8 h-8"
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
                        className={`block w-full text-left px-4 py-2 rounded transition-colors text-lg
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

