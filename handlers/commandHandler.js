const { getFromFavs } = require('../favorites');
const { getForecastByKey } = require('../weather-api');
const { SLACK_BLOCK_CONSTANTS } = require("../constants");

const {
  TYPE,
  USER_PROMPTS,
  DISPATCH_ACTION_CONFIG,
  FALLBACK,
} = SLACK_BLOCK_CONSTANTS;

async function addFav({ ack, say }) {
  await ack();

  return await say({
    blocks: [
      {
        type: TYPE.INPUT,
        dispatch_action: true,
        block_id: 'enter_fav_city',
        label: {
          type: TYPE.PLAIN_TEXT,
          text: USER_PROMPTS.CITY_TO_ADD,
        },
        element: {
          type: TYPE.ELEMENT_TYPE_TEXT,
          action_id: 'fav_city_entered',
          placeholder: {
            type: TYPE.PLAIN_TEXT,
            text: USER_PROMPTS.ENTER_CITY,
          },
          dispatch_action_config: {
            trigger_actions_on: [DISPATCH_ACTION_CONFIG.ON_ENTER_PRESSED],
          }
        }
      }
    ],
    text: FALLBACK,
  });
}

async function removeFav({ body, ack, say }) {
  await ack();

  const user = body.user_id;
  const citiesWithKeys = Object.entries(getFromFavs(user)).map(([cityKey, cityName]) => ({
    text: {
      type: TYPE.PLAIN_TEXT,
      text: cityName,
    },
    value: cityKey,
  }));

  if (citiesWithKeys.length > 0) {
    return await say({
      blocks: [
        {
          type: TYPE.SECTION,
          block_id: 'select_fav_city',
          text: {
            type: TYPE.MARKDOWN,
            text: USER_PROMPTS.RM_CITY_FROM_FAVS,
          },
          accessory: {
            action_id: 'fav_city_selected_to_remove',
            type: TYPE.STATIC_SELECT,
            placeholder: {
              type: TYPE.PLAIN_TEXT,
              text: USER_PROMPTS.SELECT_CITY,
            },
            options: citiesWithKeys,
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
        block_id: 'no_city',
        text: {
          type: TYPE.MARKDOWN,
          text: USER_PROMPTS.NO_FAVS,
        }
      }
    ],
    text: FALLBACK,
  });
}

async function getFavs({ body, ack, say }) {
  await ack();

  const user = body.user_id;
  const favs = getFromFavs(user);
  const blocks = await Promise.all(Object.keys(favs).map(async (cityKey) => {
    const { text, imageUrl } = await getForecastByKey(cityKey, favs[cityKey]);

    return {
      type: TYPE.SECTION,
      block_id: `city_forcast_${cityKey}`,
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
  }));

  return (blocks.length > 0)
    ? await say({
      blocks,
      text: FALLBACK,
    })
    : await say({
      blocks: [
        {
          type: TYPE.SECTION,
          block_id: 'no_city',
          text: {
            type: TYPE.MARKDOWN,
            text: USER_PROMPTS.NO_FAVS,
          }
        }
      ],
      text: FALLBACK,
    })
}

async function getWeather({ ack, say }) {
  await ack();

  return await say({
    blocks: [
      {
        type: TYPE.INPUT,
        dispatch_action: true,
        block_id: 'enter_city',
        label: {
          type: TYPE.PLAIN_TEXT,
          text: USER_PROMPTS.GET_WEATHER,
        },
        element: {
          type: TYPE.ELEMENT_TYPE_TEXT,
          action_id: 'city_entered',
          placeholder: {
            type: TYPE.PLAIN_TEXT,
            text: USER_PROMPTS.ENTER_CITY,
          },
          dispatch_action_config: {
            trigger_actions_on: [DISPATCH_ACTION_CONFIG.ON_ENTER_PRESSED],
          }
        }
      }
    ],
    text: FALLBACK,
  });
}

module.exports = {
  getWeather,
  addFav,
  removeFav,
  getFavs,
}