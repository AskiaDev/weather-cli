
# Weather CLI Tool

A simple Node.js CLI tool to get the current weather for any city using the OpenWeatherMap API.


## Features

- Fetch current weather by city name
- Display temperature, humidity, wind speed, and other weather details
- Automatically stores a favorite city in a local JSON file

## Prerequisites

- Node.js (v14+ recommended)
- An API key from [OpenWeatherMap](https://openweathermap.org/api)

## Setup Instructions

1. Clone the Repository:
   ```
   git clone https://github.com/AskiaDev/weather-cli.git
   cd weather-cli
   ```
2. Install dependencies
    ```
    npm install
    ```
3. Set up Environment Variables
    ```
    API_KEY=your_openweathermap_api_key_here
    ```
4. Make the CLI Tool globally available using npm link
    ```
    npm link
    ```
5. Usage
    ```
    weather current -c "CityName"
    ```
    Example getting current weather for specific city
    ```
    weather current -c "London"
    ```
    Example for setting you favorite city
    ```
    weather set-favorite -c "London"
    ```
    Example getting current weather for your favorite city
    ```
    weather favorite -u "C"
    ```
    
