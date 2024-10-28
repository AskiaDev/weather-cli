import chalk from 'chalk';

export const temperatureColor = (temperature) => {
    const temp = parseInt(temperature);

    let tempColor;
    switch (true) {
        case (temp <= 0):
            tempColor = chalk.hex('#00BFFF'); // Cold
            break;
        case (temp <= 15):
            tempColor = chalk.hex('#1E90FF'); // Cool
            break;
        case (temp <= 25):
            tempColor = chalk.hex('#3CB371'); // Mild
            break;
        case (temp <= 35):
            tempColor = chalk.hex('#FFD700'); // Warm
            break;
        case (temp <= 40):
            tempColor = chalk.hex('#FF8C00'); // Hot
            break;
        default:
            tempColor = chalk.hex('#FF4500'); // Very Hot
            break;
    }
    return tempColor(temp);
}