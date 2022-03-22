const {
    getWeather,
    addFav,
    removeFav,
    getFavs
} = require('./commandHandler.js');

const {
    cityEntered,
    citySelected,
    favCityEntered,
    favCitySelected,
    favCitySelectedToRemove,
} = require('./actionHandler.js');

module.exports = {
    cityEntered,
    citySelected,
    favCityEntered,
    favCitySelected,
    favCitySelectedToRemove,
    getWeather,
    addFav,
    removeFav,
    getFavs,
}