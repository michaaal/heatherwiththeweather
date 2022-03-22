# Heather with the Weather

An interactive Slack app to get the current weather in any city


- Get the weather of any city 
- Add and remove cities from your favorites list to quickly get the weather of all favorite cities

Leverages [AccuWeather's API](https://developer.accuweather.com/apis). Note: current API limitation is 50 calls/day.


## Getting started

Add the .env file to the root of the project, which should include the following variables:
- ACCUWEATHER_API_KEY
- SLACK_APP_TOKEN
- SLACK_BOT_TOKEN
- SLACK_SIGNING_SECRET

Install dependencies and run the app
```
npm i
npm start
```

## Interacting with Heather

Heather can currently be interacted with on Michal's Workspace.
Make sure Heather is part of your channel or add her by mentioning her: `@Heather with the Weather`

Heather supports the following slack commands (without parameters):

```
/getweather
/addfav
/removefav
/getfavs
```

Each command will begin an interactive flow

## TODO

- Tests
- Error handling
- Persisting Favorites to database
- Hosting weather images

