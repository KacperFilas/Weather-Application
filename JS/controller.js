import ViewWeather from "./views/WeatherIconsView.js";
import SearchBarView from "./views/SearchBarView.js";
import MainWeatherView from "./views/MainWeatherView.js";

import * as model from "./model.js";
import View from "./views/View.js";

const GetWeatherOnInit = async function () {
  ViewWeather.renderSpinner();
  try {
    // Get Coordinates form geolocation

    await model.getCoordsFromGeo();

    console.log(model.state);

    if (model.state.allow === false) {
      GetNewCoords("Warsaw");
      alert(
        "Without geolocation allowed, the app will show warsaw as the default city :D"
      );
      return setTimeout(MainWeatherView.showEverything, 800);
    }

    // Get weather from api using geolocation coordinates
    await model.GetWeatherResults(
      model.state.coords.lat,
      model.state.coords.long
    );

    // Get location name from api using geolocation coordinates
    await model.getLocationName(
      model.state.coords.lat,
      model.state.coords.long
    );

    console.log(1);
    // Save weather info from model into a variable
    const state = model.state;

    // Render Weather Tabs using weather info stored in state variable
    ViewWeather.render(state);
    // Render Main weather info on load of the location
    MainWeatherView.render(state);
    // Unhide correct image on load of the location
    MainWeatherView.changeClasses();
    // Add handlers to enable changing images and main weather info on click of weather tab
    MainWeatherView.addEventHandler(
      MainWeatherView.addSelectedClass,
      MainWeatherView.changeClasses
    );

    setTimeout(MainWeatherView.showEverything, 300);
  } catch (err) {
    console.error(err);
  }
};

const GetNewCoords = async function (input) {
  try {
    // Get coordinates from api using location name input
    await model.getCoordsFromInput(input);

    // Get weather from api using input coordinates   -  Get location name using coordinates
    await model.GetWeatherResults(
      model.state.coords.lat,
      model.state.coords.long
    );

    // Save weather info from model into a variable
    const state = model.state;
    ViewWeather.render(state);
    console.log(state);
    //Overwrite number of the selected day back to 0 so on load it shows today (day number 1)
    MainWeatherView.dayNumber = 0;
    // Render Main weather info on load of the location
    MainWeatherView.render(state);
    // Unhide correct image on load of the location
    MainWeatherView.changeClasses();
    // Add handlers to enable changing images and main weather info on click of weather tab
    MainWeatherView.addEventHandler(
      MainWeatherView.addSelectedClass,
      MainWeatherView.changeClasses
    );
  } catch (err) {
    console.error(err);
  }
};

// const GetNewCoords = function () {
//   const input = SearchBarView.addSubmitHandler();
//   console.log(input);
//   model.getCoordsFromInput(input);
// };

SearchBarView.addDoOnClick(GetNewCoords);

// SearchBarView.addDoOnClick(model.getCoordsFromInput);
GetWeatherOnInit();
