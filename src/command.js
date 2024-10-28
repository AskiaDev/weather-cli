import { Command } from "commander";
import { getWeather } from "./weather.js";
import chalk from "chalk";
import * as util from '../utils/index.js';
import { getDB, updateFavoriteCity } from "./db.js";

const program = new Command();

program
    .name('weather')
    .description('A simple weather CLI tool')
    .version('1.0.0');

program
    .command('current')
    .description('Get the weather of a city')
    .option('-c, --city <city>', 'City name')
    .action(async (options) => {
        const city = options.city || 'Manila';
        const result = await getWeather(city);
        if (result.cod === '404') {
            console.log(chalk.red('City not found'));
            return;
        }
        const { temp, feels_like } = result.main

        console.log(`${chalk.bold('Temperature:')} ${util.temperatureColor(`${util.toCelcius(temp)}`)}\n${chalk.bold('City:')} ${result.name}\n${chalk.bold('Weather:')} ${result.weather[0].description}\n${chalk.bold('Feels Like:')} ${feels_like}\n${chalk.bold('Humidity:')} ${result.main.humidity}%\n`);
    });

program
    .command("set-favorite")
    .description("Set your favorite city")
    .option("-c, --city <city>", "City name")
    .action(async (options) => {
        const city = options.city || "Manila";
        const favorite = await updateFavoriteCity(city)
        const db = await getDB();
        console.log(`Favorite city set to ${favorite}`);
        console.log(`Current favorite city: ${db.favorite}`);
    });

program
    .command("favorite")
    .description("Get the weather of your favorite city")
    .option("-u, --unit <unit>", "Unit")
    .action(async (options) => {
        const db = await getDB();
        if (!db.favorite) {
            console.log(chalk.red("Favorite city not set"));
            return;
        }
        const result = await getWeather(db.favorite);
        if (result.cod === "404") {
            console.log(chalk.red("City not found"));
            return;
        }
        const { feels_like } = result.main;
        const unit = options.unit || "C";

        let temp = result.main.temp;

        if (unit === "F") {
            temp = util.toFarhenheit(temp);
        } else {
            temp = util.toCelcius(temp);
        }

        console.log(
            `${chalk.bold("Temperature:")} ${util.temperatureColor(
                `${temp}`
            )}${unit === "F" ? "°F" : "°C"}\n${chalk.bold("City:")} ${result.name}\n${chalk.bold(
                "Weather:"
            )} ${result.weather[0].description}\n${chalk.bold(
                "Feels Like:"
            )} ${feels_like}\n${chalk.bold("Humidity:")} ${result.main.humidity
            }%\n${chalk.bold("Unit:")} ${unit === "F" ? "Farenheit" : "Celcius"}\n`
        );
    });


program.parse(process.argv);