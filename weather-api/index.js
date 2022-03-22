const axios = require('axios');

const ACCUWEATHER_BASE_URL = 'http://dataservice.accuweather.com/';

async function getCitiesWithKeys(userInput) {
  try {
    const encodedUrl = encodeURI(`${ACCUWEATHER_BASE_URL}locations/v1/cities/search?apikey=${process.env.ACCUWEATHER_API_KEY}&q=${userInput.trim()}`);
    const response = await axios.get(encodedUrl);

    return response.data.map(result => ({
      text: {
        type: 'plain_text',
        text: `${result.EnglishName}, ${result.AdministrativeArea.EnglishName}, ${result.Country.EnglishName}`
      },
      value: result.Key
    }));
  } catch (err) {
    console.log(err);
    
    return [];
  }

}

async function getForecastByKey(cityKey, cityName) {
  try {
    const encodedUrl = encodeURI(`${ACCUWEATHER_BASE_URL}currentconditions/v1/${cityKey}?apikey=${process.env.ACCUWEATHER_API_KEY}`);
    const response = await axios.get(encodedUrl);
    const data = response.data[0];

    const text =
      `_*${cityName}*_
  *${data.Temperature.Metric.Value} °C* / *${data.Temperature.Imperial.Value} °F*
  _${data.WeatherText}_`;
    const imageUrl = (data.WeatherIcon > 10) ? `https://developer.accuweather.com/sites/default/files/${data.WeatherIcon}-s.png` :
      `https://developer.accuweather.com/sites/default/files/0${data.WeatherIcon}-s.png`

    return { text, imageUrl };
  } catch (err) {
    console.log(err);
    
    return {};
  }
}

module.exports = {
  getCitiesWithKeys,
  getForecastByKey,
}