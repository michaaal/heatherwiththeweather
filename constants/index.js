module.exports = {
  COMMANDS: {
    GET_WEATHER: '/getweather',
    ADD_FAV: '/addfav',
    GET_FAVS: '/getfavs',
    REMOVE_FAV: '/removefav'
  },
  ACTIONS: {
    FAV_CITY_ENTERED: 'fav_city_entered',
    FAV_CITY_SELECTED: 'fav_city_selected',
    FAV_CITY_SELECTED_TO_REMOVE: 'fav_city_selected_to_remove',
    CITY_ENTERED: 'city_entered',
    CITY_SELECTED: 'city_selected',
  },
  SLACK_BLOCK_CONSTANTS: {
    TYPE: {
      INPUT: 'input',
      PLAIN_TEXT: 'plain_text',
      ELEMENT_TYPE_TEXT: 'plain_text_input',
      SECTION: 'section',
      MARKDOWN: 'mrkdwn',
      STATIC_SELECT: 'static_select',
      IMG: 'image',
    },
    DISPATCH_ACTION_CONFIG: {
      ON_ENTER_PRESSED: 'on_enter_pressed',
    },
    USER_PROMPTS: {
      GET_WEATHER: 'Let\'s get the weather!',
      CITY_TO_ADD: 'Type in city to add',
      ENTER_CITY: 'Enter city',
      RM_CITY_FROM_FAVS: 'Select city to remove from favorites',
      SELECT_CITY: 'Select city',
      NO_FAVS: 'No saved favorites!',
      CITY_NOT_FOUND: 'Uh oh, city not found. Try again?',
      MULT_CITIES_FOUND: 'More than one city found!',
    },
    FALLBACK: 'Content cannot be displayed',
  },
}