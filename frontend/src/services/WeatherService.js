// frontend/src/services/WeatherService.js
import axios from 'axios';

export const getLocation = async () => {
    const response = await axios.get('https://ipapi.co/json/');
    return response.data;
};

export const getWeather = async (lat, lon) => {
    const response = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
    return response.data.current_weather;
};

export const weatherCodeToDescription = (code) => {
    const weatherDescriptions = {
        0: 'Clear sky',
        1: 'Mainly clear',
        2: 'Partly cloudy',
        3: 'Overcast',
        45: 'Fog',
        48: 'Depositing rime fog',
        51: 'Drizzle: Light',
        53: 'Drizzle: Moderate',
        55: 'Drizzle: Dense intensity',
        56: 'Freezing Drizzle: Light',
        57: 'Freezing Drizzle: Dense intensity',
        61: 'Rain: Slight',
        63: 'Rain: Moderate',
        65: 'Rain: Heavy intensity',
        66: 'Freezing Rain: Light',
        67: 'Freezing Rain: Heavy intensity',
        71: 'Snow fall: Slight',
        73: 'Snow fall: Moderate',
        75: 'Snow fall: Heavy intensity',
        77: 'Snow grains',
        80: 'Rain showers: Slight',
        81: 'Rain showers: Moderate',
        82: 'Rain showers: Violent',
        85: 'Snow showers: Slight',
        86: 'Snow showers: Heavy',
        95: 'Thunderstorm: Slight or moderate',
        96: 'Thunderstorm with slight hail',
        99: 'Thunderstorm with heavy hail'
    };

    return weatherDescriptions[code] || 'Unknown weather';
};
