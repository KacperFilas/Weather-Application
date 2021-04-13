import ViewWeather from "./views/WeatherIconsView.js";
import SearchBarView from "./views/SearchBarView.js";
import MainWeatherView from "./views/MainWeatherView.js";

import * as model from "./model.js";
import View from "./views/View.js";

const GetWeatherOnInit = async function () {
  // ViewWeather.renderSpinner();
  try {
    // Get Coordinates form geolocation

    await model.getCoordsFromGeo();

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

    setTimeout(MainWeatherView.showEverything, 800);
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

// const img = new Image();
// img.onload = function () {
//   SearchBarView.addDoOnClick(GetNewCoords);

//   GetWeatherOnInit();
// };

const Init = function () {
  SearchBarView.addDoOnClick(GetNewCoords);
  GetWeatherOnInit();
};

if (document.readyState !== "loading") {
  // document is already ready, just execute code here
  Init();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    // document was not ready, place code here"
    Init();
  });
}
// SearchBarView.addDoOnClick(GetNewCoords);

// GetWeatherOnInit();

//the event occurred
