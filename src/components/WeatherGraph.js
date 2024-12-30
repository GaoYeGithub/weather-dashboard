import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { catppuccin } from '../constants/themes';
import { formatTime } from '../utils/formatters';

export const WeatherGraph = ({ data, dataKey, theme, label, color }) => {
    if (!data) return null;

    return (
        <div className="w-[48%] rounded-lg p-4 mb-6 transition-all duration-300 hover:shadow-lg" 
             style={{ 
                 backgroundColor: catppuccin[theme].surface0,
                 border: `1px solid ${catppuccin[theme].overlay0}`
             }}>
            <h3 className="text-2xl font-bold mb-4"
                style={{ color: catppuccin[theme].text }}>
                {label}
            </h3>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                    <CartesianGrid 
                        strokeDasharray="3 3" 
                        stroke={catppuccin[theme].overlay0}
                        opacity={0.5}
                    />
                    <XAxis 
                        dataKey="time"
                        stroke={catppuccin[theme].text}
                        tick={{ fill: catppuccin[theme].text }}
                        tickFormatter={formatTime}
                        dy={10}
                    />
                    <YAxis 
                        stroke={catppuccin[theme].text}
                        tick={{ fill: catppuccin[theme].text }}
                        dx={-10}
                    />
                    <Tooltip 
                        contentStyle={{ 
                            backgroundColor: catppuccin[theme].surface1,
                            border: `1px solid ${catppuccin[theme].overlay0}`,
                            color: catppuccin[theme].text,
                            borderRadius: '8px',
                            padding: '8px'
                        }}
                        labelStyle={{ color: catppuccin[theme].text }}
                    />
                    <Line 
                        type="monotone" 
                        dataKey={dataKey}
                        stroke={color}
                        strokeWidth={3}
                        dot={false}
                        activeDot={{ 
                            r: 6, 
                            fill: color,
                            stroke: catppuccin[theme].base,
                            strokeWidth: 2
                        }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};
