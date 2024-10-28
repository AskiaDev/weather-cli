import chalk from 'chalk';
import dotenv from 'dotenv';

dotenv.config();

const API_URL = `https://api.openweathermap.org/data/2.5/weather`;


export const getWeather = async (country) => {
    try {
        const params = new URLSearchParams({
            q: country, // Your city name here
            appid: process.env.WEATHER_API_KEY
        });
        const fullURL = `${API_URL}?${params.toString()}`;
        const response = await fetch(fullURL);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(chalk.red('City not found!'));
    }
}


