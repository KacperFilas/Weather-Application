// import "regenerator-runtime/runtime.js";
import * as config from "./config.js";

export const state = {
  allow: {},
  city: {},
  utcOffset: {},
  currentDay: {},
  weather: {
    day1: {},
    day2: {},
    day3: {},
    day4: {},
    day5: {},
  },

  coords: { long: {}, lat: {} },
};

//CREATE OBJECT WITH NEW INFORMATION
const createWeatherObject = function (data) {
  //Creating Timeseries Array
  const timeseries = data.properties.timeseries;
  const weatherInfo = [timeseries[0]];

  let today = new Date(Date.now()).getDate();
  state.currentDay = today;

  //Creating array with only one weather element per day
  timeseries.forEach((element) => {
    if (
      new Date(element.time).getUTCHours() === 12 &&
      new Date(element.time).getDate() !== today
    ) {
      weatherInfo.push(element);
    }
  });

  // Updateing State with weatherInfo
  Object.keys(state.weather).forEach((key, i) => {
    state.weather[key] = {
      time: weatherInfo[i].time,
      temperature: weatherInfo[i].data.instant.details.air_temperature,
      weatherType: weatherInfo[i].data.next_1_hours
        ? weatherInfo[i].data.next_1_hours.summary.symbol_code
        : weatherInfo[i].data.next_6_hours.summary.symbol_code,
      wind: weatherInfo[i].data.instant.details.wind_speed,
      airPressure:
        weatherInfo[i].data.instant.details.air_pressure_at_sea_level,
      humidity: weatherInfo[i].data.instant.details.relative_humidity,
    };
  });
};
// GET WEATHER FROM API
export const GetWeatherResults = async function (lat, long) {
  try {
    const res = await fetch(
      `https://api.met.no/weatherapi/locationforecast/2.0/complete.json?lat=${lat}&lon=${long}`
    );

    const data = await res.json();

    createWeatherObject(data);
  } catch (err) {
    console.error(err);
  }
};

// GET GEOLOCATION
export const getCoordsFromGeo = async function () {
  try {
    const pos = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    return (state.coords = {
      long: pos.coords.longitude,
      lat: pos.coords.latitude,
    });
  } catch (err) {
    state.allow = false;
  }
};

// Get Coords from input
export const getCoordsFromInput = async function (input) {
  if (input === state.city) return;

  try {
    // const res = await fetch(`https://geocode.xyz/${input}?json=1`);
    const res = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${input}&key=${config.API_KEY3}`
    );

    const data = await res.json();
    console.log(data);

    const locationName = function () {
      if (data.results[0].components.hasOwnProperty("city")) {
        return data.results[0].components.city;
      }

      if (data.results[0].components.hasOwnProperty("town")) {
        return data.results[0].components.town;
      }

      if (data.results[0].components.hasOwnProperty("village")) {
        return data.results[0].components.village;
      }

      if (data.results[0].components.hasOwnProperty("administrative")) {
        return data.results[0].components.administrative;
      }

      return "";
    };
    const location = locationName();

    return (
      (state.coords = {
        long: data.results[0].geometry.lng,
        lat: data.results[0].geometry.lat,
      }),
      (state.city = location),
      (state.utcOffset = data.results[0].annotations.timezone.offset_sec / 3600)
    );
  } catch (err) {
    console.log(err);
  }
};

// Get Location name from coords
export const getLocationName = async function (lat, long) {
  try {
    const res = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${long}&key=${config.API_KEY3}`
    );

    const data = await res.json();

    const locationName = function () {
      if (data.results[0].components.hasOwnProperty("city")) {
        return data.results[0].components.city;
      }

      if (data.results[0].components.hasOwnProperty("village")) {
        return data.results[0].components.village;
      }

      if (data.results[0].components.hasOwnProperty("administrative")) {
        return data.results[0].components.administrative;
      }

      return "";
    };
    const location = locationName();

    return (
      (state.city = location),
      (state.utcOffset = data.results[0].annotations.timezone.offset_sec / 3600)
    );
  } catch (err) {
    console.log(err);
  }
};

// export const GetTimeOfLocation = async function (timezone) {
//   try {
//     const res = await fetch(
//       `https://api.ipgeolocation.io/timezone?apiKey=${config.API_KEY2}&tz=${timezone}`
//     );

//     const data = await res.json();
//     console.log(data);

//     // const str = data.utc_offset.slice(0, -3);

//     const nr = data.timezone_offset + 1;

//     console.log("done");
//     return (state.utcOffset = nr);
//   } catch (err) {
//     console.log(err);
//   }
// };
