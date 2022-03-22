const { getCitiesWithKeys, getForecastByKey } = require('../weather-api');
const { addToFavs, removeFromFavs } = require('../favorites');
const { SLACK_BLOCK_CONSTANTS } = require("../constants");

const {
  TYPE,
  USER_PROMPTS,
  FALLBACK,
} = SLACK_BLOCK_CONSTANTS;

async function citySelected({ body, ack, say }) {
  await ack();

  const cityKey = body.actions[0].selected_option.value;
  const cityName = body.actions[0].selected_option.text.text;
  const { text, imageUrl } = await getForecastByKey(cityKey, cityName);

  return await say({
    blocks: [
      {
        type: TYPE.SECTION,
        block_id: 'city_forecast',
        text: {
          type: TYPE.MARKDOWN,
          text,
        },
        accessory: {
          type: TYPE.IMG,
          image_url: imageUrl,
          alt_text: FALLBACK,
        }
      }
    ],
    text: FALLBACK,
  });
}

async function cityEntered({ body, ack, say }) {
  await ack();

  const userInput = body.actions[0].value;
  citiesWithKeys = await getCitiesWithKeys(userInput);

  if (citiesWithKeys.length === 0) {
    return await say({
      blocks: [
        {
          type: TYPE.SECTION,
          block_id: 'invalid_city',
          text: {
            type: TYPE.MARKDOWN,
            text: USER_PROMPTS.CITY_NOT_FOUND,
          }
        }
      ],
      text: FALLBACK,
    });
  }
  if (citiesWithKeys.length === 1) {
    const cityKey = citiesWithKeys[0].value;
    const cityName = citiesWithKeys[0].text.text;
    const { text, imageUrl } = await getForecastByKey(cityKey, cityName);

    return await say({
      blocks: [
        {
          type: TYPE.SECTION,
          block_id: 'city_forcast',
          text: {
            type: TYPE.MARKDOWN,
            text,
          },
          accessory: {
            type: TYPE.IMG,
            image_url: imageUrl,
            alt_text: FALLBACK,
          }
        }
      ],
      text: FALLBACK,
    });
  }
  return await say({
    blocks: [
      {
        type: TYPE.SECTION,
        block_id: 'select_city',
        text: {
          type: TYPE.MARKDOWN,
          text: USER_PROMPTS.MULT_CITIES_FOUND
        },
        accessory: {
          action_id: 'city_selected',
          type: TYPE.STATIC_SELECT,
          placeholder: {
            type: TYPE.PLAIN_TEXT,
            text: USER_PROMPTS.SELECT_CITY,
          },
          options: citiesWithKeys,
        }
      }
    ],
    text: FALLBACK
  });

}

async function favCityEntered({ body, ack, say }) {
  await ack();

  const user = body.user.id;
  const userInput = body.actions[0].value;
  const citiesWithKeys = await getCitiesWithKeys(userInput);

  if (citiesWithKeys.length === 0) {
    return await say({
      blocks: [
        {
          type: TYPE.SECTION,
          block_id: 'invalid_city',
          text: {
            type: TYPE.MARKDOWN,
            text: USER_PROMPTS.CITY_NOT_FOUND,
          }
        }
      ],
      text: FALLBACK,
    });
  }

  if (citiesWithKeys.length === 1) {
    const cityKey = citiesWithKeys[0].value;
    const cityName = citiesWithKeys[0].text.text

    addToFavs(user, cityKey, cityName);

    return await say({
      blocks: [
        {
          type: TYPE.SECTION,
          block_id: 'fav_added',
          text: {
            type: TYPE.MARKDOWN,
            text: `${cityName} added to favorites!`,
          }
        }
      ],
      text: FALLBACK,
    });
  }

  return await say({
    blocks: [
      {
        type: TYPE.SECTION,
        block_id: 'select_fav_city',
        text: {
          type: TYPE.MARKDOWN,
          text: USER_PROMPTS.MULT_CITIES_FOUND,
        },
        accessory: {
          action_id: 'fav_city_selected',
          type: TYPE.STATIC_SELECT,
          placeholder: {
            type: TYPE.PLAIN_TEXT,
            text: USER_PROMPTS.SELECT_CITY,
          },
          options: citiesWithKeys,
        }
      }
    ],
    text: FALLBACK
  });
}

async function favCitySelected({ body, ack, say }) {
  await ack();

  const user = body.user.id;
  const cityKey = body.actions[0].selected_option.value;
  const cityName = body.actions[0].selected_option.text.text;

  addToFavs(user, cityKey, cityName);

  return await say({
    blocks: [
      {
        type: TYPE.SECTION,
        block_id: 'fav_added',
        text: {
          type: TYPE.MARKDOWN,
          text: `${cityName} added to favorites!`,
        }
      }
    ],
    text: FALLBACK,
  });
}

async function favCitySelectedToRemove({ body, ack, say }) {
  await ack();

  const user = body.user.id;
  const cityKey = body.actions[0].selected_option.value;
  const cityName = body.actions[0].selected_option.text.text;

  removeFromFavs(user, cityKey, cityName);

  return await say({
    blocks: [
      {
        type: TYPE.SECTION,
        block_id: 'fav_removed',
        text: {
          type: TYPE.MARKDOWN,
          text: `${cityName} removed from favorites!`,
        }
      }
    ],
    text: FALLBACK,
  });
}

module.exports = {
  favCityEntered,
  favCitySelected,
  favCitySelectedToRemove,
  cityEntered,
  citySelected,
}