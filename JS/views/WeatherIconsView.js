import { state } from "../model.js";
import View from "./View.js";
import icons from "../config.js";

class WeatherIconsView extends View {
  _parentElement = document.querySelector(".container__weather");

  renderIcon(weatherType, time) {
    const currDay = this._data.currentDay;
    // Check if date equals current date to detarmine wheter to render night or day
    const checkForToday = function () {
      if (new Date(time).getDate() === currDay) {
        return true;
      }
    };

    checkForToday();

    if (weatherType.includes("fair") || weatherType.includes("clearsky")) {
      // IF FAIR OR CLEARSKY RENDER BY condition from checkForToday function
      if (checkForToday()) {
        const img = weatherType.includes("day") ? icons.day : icons.night;
        return img;
      }

      return icons.day;
    }

    if (weatherType.includes("sleet")) {
      // console.log("sleet.png ");
      return icons.sleet;
    }

    if (weatherType.includes("cloudy")) {
      // console.log("cloudy.png ");
      return icons.clouds;
    }

    if (weatherType.includes("fog")) {
      // console.log("fog.png ");
      return icons.fog;
    }

    if (weatherType.includes("snow")) {
      // console.log("snow.png ");
      return icons.snow;
    }

    if (weatherType.includes("thunder")) {
      // console.log("heavythunder.png ");
      return icons.thudner;
    }

    if (weatherType.includes("snow") && weatherType.includes("thunder")) {
      // data.log("heavysnowandthunder.png ");
      return icons.snow;
    }

    if (weatherType.includes("rain") && weatherType.includes("thunder")) {
      // data.log("heavysnowandthunder.png ");
      return icons.rainThunder;
    }

    if (weatherType.includes("rain")) {
      // console.log("heavy_rain.png");
      return icons.rain;
    }
  }

  generateMarkup() {
    return `
                    <div class="weather__window selected">
                    <div class="weather__info-container">
                    <span class="weather__info-dotw ">Today</span>

                    <span
                        ><img class="weather__info-icon" src=${this.renderIcon(
                          this._data.weather.day1.weatherType,
                          this._data.weather.day1.time
                        )}  alt="🌧"
                    /></span>
                    <span class="weather__info-temp">${Math.round(
                      this._data.weather.day1.temperature
                    )}°</span>
                    </div>
                </div>

                <div class="weather__window">
                <div class="weather__info-container">
                    <span class="weather__info-dotw">${this.DayConverter(
                      this._data.weather.day2.time
                    )}</span>

                    <span
                    ><img class="weather__info-icon" src=${this.renderIcon(
                      this._data.weather.day2.weatherType,
                      this._data.weather.day2.time
                    )} alt="🌧"
                    /></span>
                    <span class="weather__info-temp">${Math.round(
                      this._data.weather.day2.temperature
                    )}°</span>
                </div>
                </div>

                <div class="weather__window">
                <div class="weather__info-container">
                <span class="weather__info-dotw">${this.DayConverter(
                  this._data.weather.day3.time
                )}</span>

                <span
                    ><img class="weather__info-icon" src=${this.renderIcon(
                      this._data.weather.day3.weatherType,
                      this._data.weather.day2.time
                    )} alt="🌧"
                /></span>
                <span class="weather__info-temp">${Math.round(
                  this._data.weather.day3.temperature
                )}°</span>
                </div>
                </div>

                <div class="weather__window">
                <div class="weather__info-container">
                <span class="weather__info-dotw">${this.DayConverter(
                  this._data.weather.day4.time
                )}</span>

                <span
                ><img class="weather__info-icon" src=${this.renderIcon(
                  this._data.weather.day4.weatherType,
                  this._data.weather.day4.time
                )} alt="🌧"
                /></span>
                <span class="weather__info-temp">${Math.round(
                  this._data.weather.day4.temperature
                )}°</span>
                </div>
                </div>

                <div class="weather__window">
                <div class="weather__info-container">
                <span class="weather__info-dotw">${this.DayConverter(
                  this._data.weather.day5.time
                )}</span>

                <span
                ><img class="weather__info-icon" src=${this.renderIcon(
                  this._data.weather.day5.weatherType,
                  this._data.weather.day5.time
                )} alt="🌧"
                /></span>
                <span class="weather__info-temp">${Math.round(
                  this._data.weather.day5.temperature
                )}°</span>
                </div>
                </div>

                `;
  }
}

export default new WeatherIconsView();
