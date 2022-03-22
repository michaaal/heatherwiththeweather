const USER_TO_FAVS = {};

function addToFavs(user, cityKey, cityName) {
  if (user in USER_TO_FAVS) {
    USER_TO_FAVS[user][cityKey] = cityName;
  } else {
    USER_TO_FAVS[user] = { [cityKey]: cityName };
  }
}

function removeFromFavs(user, cityKey) {
  if (user in USER_TO_FAVS) {
    delete USER_TO_FAVS[user][cityKey];
  }
}

function getFromFavs(user) {
  return USER_TO_FAVS[user] || {};
}

module.exports = {
  addToFavs,
  removeFromFavs,
  getFromFavs,
}