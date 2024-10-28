import dotenv from 'dotenv';

dotenv.config();

const API_URL = `https://api.openweathermap.org/data/2.5/weather`;
const params = new URLSearchParams({
    q: "Manila", // Your city name here
    appid: process.env.WEATHER_API_KEY
});

// Concatenate the base URL with the query string
const fullURL = `${API_URL}?${params.toString()}`;
