

export const toCelcius = (kelvin) => {
    const result = kelvin - 273.15
    return result.toFixed(2)
}

export const toFarhenheit = (kelvin) => {
    const result = (kelvin - 273.15) * 9 / 5 + 32;
    return result.toFixed(2)
}