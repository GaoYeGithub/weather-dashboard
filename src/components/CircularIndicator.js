import React from 'react';
import { catppuccin } from '../constants/themes';

export const CircularIndicator = ({ value, label, unit, color, theme }) => (
    <div 
        className="w-[25vh] h-[25vh] rounded-full flex flex-col items-center justify-center text-4xl hover:scale-110 transition-all duration-500"
        style={{ 
            border: `4px solid ${color}`,
            color: color,
            backgroundColor: catppuccin[theme].surface1
        }}
    >
        <span>{value}{unit}</span>
        <div className="text-xl mt-2">{label}</div>
    </div>
);

