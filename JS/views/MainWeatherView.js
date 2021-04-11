import View from "./View.js";
import icons from "../config.js";

class MainWeatherView extends View {
  _parentElement = document.querySelector(".container__video-main-info");
  dayNumber = 0;
  Day = document.querySelector("#Day");
  Night = document.querySelector("#Night");
  Sleet = document.querySelector("#Sleet");
  Cloud = document.querySelector("#Cloud");
  Fog = document.querySelector("#Fog");
  Snow = document.querySelector("#Snow");
  Thunder = document.querySelector("#Thunder");
  SnowThunder = document.querySelector("#SnowThunder");
  Rain = document.querySelector("#Rain");
  Cars = document.querySelector("#Cars");
  Bg = document.querySelector("html");

  getObjAt(data, pos) {
    const obj = Object.values(data)[pos];
    return obj;
  }

  getSelectedDay() {
    let classArr = [];
    const arrr = Array.from(document.querySelectorAll(".weather__window"));
    arrr.forEach((el) => {
      classArr.push(el.className);
    });

    let N = classArr.indexOf("weather__window selected");

    if (N === this.dayNumber) return;

    this.dayNumber = N;

    this.render(this._data);
  }

  addEventHandler(handler) {
    const arr = document.querySelectorAll(".weather__window");
    arr.forEach((el) => {
      el.addEventListener("click", () => {
        handler();
        this.getSelectedDay();
        this.changeClasses();
      });
    });
  }

  addSelectedClass() {
    const arr = document.querySelectorAll(".weather__window");
    arr.forEach((el) => el.classList.remove("selected"));

    const path = event.path;

    for (const el of path) {
      if (el.className === "weather__window") {
        el.classList.add("selected");
      }
    }
  }

  changeClasses() {
    const arr = document.querySelectorAll(".container__video-video");
    arr.forEach((el) => {
      el.classList.add("hidden");
      el.classList.remove("active");
    });

    const currDay = this.dayNumber;

    const weatherType = this.getObjAt(this._data.weather, this.dayNumber)
      .weatherType;

    const time = new Date(
      this.getObjAt(this._data.weather, this.dayNumber).time
    ).getUTCHours();

    const offset = this._data.utcOffset;

    const currentTime = function () {
      let curT = offset + time;
      let hoursOver24 = curT - 24;
      if (hoursOver24 > 0) {
        return hoursOver24;
      }
      return curT;
    };

    const checkifdayone = function () {
      if (currDay === 0) {
        if (currentTime() > 6 && currentTime() < 18) return `day`;

        if (currentTime() < 6 || currentTime() > 18) return `night`;
      }
      return `day`;
    };

    const changeBrightness = function (el, targetNumber, duration = 500) {
      el.animate(
        [
          { filter: `${el.style.filter}` },
          { filter: `brightness(${targetNumber}%)` },
        ],
        {
          duration: duration,
        }
      );
      el.style.filter = `brightness(${targetNumber}%)`;
    };

    this.Cars.classList.add("active");

    // IF DAY
    if (checkifdayone() === `day`) {
      this.Day.classList.add("active");

      changeBrightness(this.Cars, 100);
      this.Bg.style.background = `linear-gradient(0deg,rgb(52, 70, 97) 0%,rgb(127, 167, 253) 100%)`;
    }

    // IF NIGHT
    if (checkifdayone() === `night`) {
      this.Night.classList.add("active");

      changeBrightness(this.Cars, 10);
      this.Bg.style.background = `linear-gradient(0deg, rgb(52, 70, 97) 0%, rgb(36, 66, 131) 100%)`;
    }

    // IF CLOUD
    if (weatherType.includes("cloudy")) {
      this.Cloud.classList.add("active");

      checkifdayone() === `day`
        ? changeBrightness(this.Cloud, 100)
        : //NIGHT
          changeBrightness(this.Cloud, 30);
    }

    if (weatherType.includes("sleet")) {
      this.Cloud.classList.add("active");
      this.Snow.classList.add("active");
      this.Rain.classList.add("active");

      checkifdayone() === `day`
        ? (changeBrightness(this.Cloud, 70),
          changeBrightness(this.Snow, 100),
          changeBrightness(this.Rain, 100))
        : //NIGHT
          (changeBrightness(this.Cloud, 30),
          changeBrightness(this.Snow, 50),
          changeBrightness(this.Rain, 50));
    }

    // IF FOG
    if (weatherType.includes("fog")) {
      this.Fog.classList.add("active");
      this.Cloud.classList.add("active");

      checkifdayone() === `day`
        ? (changeBrightness(this.Cloud, 100), changeBrightness(this.Fog, 100))
        : //NIGHT
          (changeBrightness(this.Cloud, 30), changeBrightness(this.Fog, 30));
    }
    // IF SNOW
    if (weatherType.includes("snow")) {
      this.Snow.classList.add("active");
      this.Cloud.classList.add("active");

      checkifdayone() === `day`
        ? (changeBrightness(this.Cloud, 100), changeBrightness(this.Snow, 100))
        : //NIGHT
          (changeBrightness(this.Cloud, 30), changeBrightness(this.Snow, 50));
    }
    // IF THUNDER
    if (weatherType.includes("thunder")) {
      this.Thunder.classList.add("active");
      this.Cloud.classList.add("active");

      checkifdayone() === `day`
        ? (changeBrightness(this.Cloud, 70),
          changeBrightness(this.Thunder, 100))
        : //NIGHT
          (changeBrightness(this.Cloud, 30),
          changeBrightness(this.Thunder, 50));
    }
    // IF SNOW AND THUNDER
    if (weatherType.includes("snow") && weatherType.includes("thunder")) {
      this.Snow.classList.add("active");
      this.Thunder.classList.add("active");
      this.Cloud.classList.add("active");

      checkifdayone() === `day`
        ? (changeBrightness(this.Cloud, 70),
          changeBrightness(this.Thunder, 100),
          changeBrightness(this.Snow, 100))
        : //NIGHT
          (changeBrightness(this.Cloud, 30),
          changeBrightness(this.Thunder, 50),
          changeBrightness(this.Snow, 50));
    }

    // IF THUNDE AND RAIN
    if (weatherType.includes("rain") && weatherType.includes("thunder")) {
      this.Rain.classList.add("active");
      this.Thunder.classList.add("active");
      this.Cloud.classList.add("active");

      checkifdayone() === `day`
        ? (changeBrightness(this.Cloud, 70),
          changeBrightness(this.Thunder, 100),
          changeBrightness(this.Rain, 100))
        : //NIGHT
          (changeBrightness(this.Cloud, 30),
          changeBrightness(this.Thunder, 50),
          changeBrightness(this.Rain, 50));
    }

    // IF RAIN
    if (weatherType.includes("rain")) {
      this.Rain.classList.add("active");
      this.Cloud.classList.add("active");

      checkifdayone() === `day`
        ? (changeBrightness(this.Cloud, 80), changeBrightness(this.Rain, 100))
        : //NIGHT
          (changeBrightness(this.Cloud, 30), changeBrightness(this.Rain, 50));
    }
  }

  showEverything() {
    document.getElementById("main_container").classList.add("main_active");

    document
      .querySelector(".loadingio-spinner-dual-ring-r1sfx2fv9kp")
      .parentElement.firstElementChild.remove();
  }

  generateMarkup() {
    return `  
          <div id="absolute">
            <h1>${this._data.city}</h1>
            <span id="weather__main-air-pressure" class="main_text"><img class="weather__main-icon" src=${
              icons.gauge
            } alt="🌧"
              />${
                this.getObjAt(this._data.weather, this.dayNumber).airPressure
              }hPa</span>
            <span id="weather__main-air-humidity" class="main_text"><img class="weather__main-icon" src=${
              icons.humidity
            }  alt="🌧"
              />${
                this.getObjAt(this._data.weather, this.dayNumber).humidity
              }%</span>
            <span id="weather__main-air-wind" class="main_text"><img class="weather__main-icon" src=${
              icons.wind
            } alt="🌧"
              />${
                this.getObjAt(this._data.weather, this.dayNumber).wind
              }m/s</span>
          </div>
    `;
  }
}

export default new MainWeatherView();
