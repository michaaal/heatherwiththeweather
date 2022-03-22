const { App } = require('@slack/bolt');
const {
  ACTIONS,
  COMMANDS
} = require('./constants');
const {
  favCityEntered,
  cityEntered,
  citySelected,
  favCitySelected,
  addFav,
  removeFav,
  getFavs,
  favCitySelectedToRemove,
  getWeather
} = require('./handlers/index.js');


function initApp() {
  const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    socketMode: true,
    appToken: process.env.SLACK_APP_TOKEN,
  });

  // Command Handlers
  app.command(COMMANDS.GET_WEATHER, getWeather);
  app.command(COMMANDS.ADD_FAV, addFav);
  app.command(COMMANDS.GET_FAVS, getFavs);
  app.command(COMMANDS.REMOVE_FAV, removeFav);

  // Action Handlers
  app.action(ACTIONS.FAV_CITY_ENTERED, favCityEntered);
  app.action(ACTIONS.FAV_CITY_SELECTED, favCitySelected);
  app.action(ACTIONS.FAV_CITY_SELECTED_TO_REMOVE, favCitySelectedToRemove);
  app.action(ACTIONS.CITY_ENTERED, cityEntered);
  app.action(ACTIONS.CITY_SELECTED, citySelected);

  return app;
}

async function runApp() {
  const app = initApp();
  
  await app.start();
  console.log('⚡️ Bolt app is running!');
}

runApp();