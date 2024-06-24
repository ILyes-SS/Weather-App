import { format, differenceInMinutes, parse, addMinutes } from "date-fns";
import vent from "./icons/vent.png";
import flux from "./icons/flux.png";
import locating from "./icons/broche-de-localisation.png";
import "./style.css";

function changeBgClrBasedOnTime(data) {
  const body = document.querySelector("body");
  const time1 = data.sunrise;
  const time2 = data.sunset;
  const sunrise = parse(time1, "h:mm a", new Date());
  const sunset = parse(time2, "h:mm a", new Date());
  const now = new Date();

  const differenceInMinutesSunset = Math.abs(differenceInMinutes(now, sunset));
  const differenceInMinutesSunrise = differenceInMinutes(now, sunrise);

  if (differenceInMinutesSunset <= 20 || differenceInMinutesSunset >= 1420) {
    body.style.backgroundColor = "orange";
  } else if (
    differenceInMinutes(now, addMinutes(sunset, 20)) <= 545 &&
    differenceInMinutesSunrise >= 894
  ) {
    body.style.backgroundColor = "black";
  } else {
    body.style.backgroundColor = "blue";
  }
}
function toggleCelsiusFahrenheit() {
  const tempBtn = document.querySelector("body > button");

  if (tempBtn.className == "celsius") {
    tempBtn.classList.remove("celsius");
    tempBtn.classList.add("fahrenheit");
    tempBtn.textContent = "°C";
  } else {
    tempBtn.classList.add("celsius");
    tempBtn.classList.remove("fahrenheit");
    tempBtn.textContent = "°F";
  }
}
function takeLocation() {
  const inpLocation = document.querySelector("input");
  const dialog = document.querySelector("dialog");
  const form = document.querySelector("form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let loc = inpLocation.value || "mostaganem";
    fetchData(loc);
    dialog.close();
  });
}
function extractRequiredData(data) {
  const neededData = {
    location: data["location"]["name"],
    celsius: data["current"]["temp_c"],
    fahrenheit: data["current"]["temp_f"],
    weather: data["current"]["condition"]["text"],
    icon: data["current"]["condition"]["icon"],
    windSpeed: data["current"]["wind_kph"],
    humidity: data["current"]["humidity"],
    maxTempCelsius: data["forecast"]["forecastday"][0]["day"]["maxtemp_c"],
    maxTempFahrenheit: data["forecast"]["forecastday"][0]["day"]["maxtemp_f"],
    minTempCelsius: data["forecast"]["forecastday"][0]["day"]["mintemp_c"],
    minTempFahrenheit: data["forecast"]["forecastday"][0]["day"]["mintemp_f"],
    iconToday: data["forecast"]["forecastday"][0]["day"]["condition"]["icon"],

    sunrise: data["forecast"]["forecastday"][0]["astro"]["sunrise"],
    sunset: data["forecast"]["forecastday"][0]["astro"]["sunset"],
    //tomorrow
    tm_maxTempCelsius: data["forecast"]["forecastday"][1]["day"]["maxtemp_c"],
    tm_maxTempFahrenheit:
      data["forecast"]["forecastday"][1]["day"]["maxtemp_f"],
    tm_minTempCelsius: data["forecast"]["forecastday"][1]["day"]["mintemp_c"],
    tm_minTempFahrenheit:
      data["forecast"]["forecastday"][1]["day"]["mintemp_f"],
    iconTomorrow:
      data["forecast"]["forecastday"][1]["day"]["condition"]["icon"],
    //after tomorrow
    af_maxTempCelsius: data["forecast"]["forecastday"][2]["day"]["maxtemp_c"],
    af_maxTempFahrenheit:
      data["forecast"]["forecastday"][2]["day"]["maxtemp_f"],
    af_minTempCelsius: data["forecast"]["forecastday"][2]["day"]["mintemp_c"],
    af_minTempFahrenheit:
      data["forecast"]["forecastday"][2]["day"]["mintemp_f"],
    iconAfterTomorrow:
      data["forecast"]["forecastday"][2]["day"]["condition"]["icon"],
  };
  return neededData;
}
function displayInfos(neededData) {
  let data = extractRequiredData(neededData);

  const tempBtn = document.querySelector("body > button");
  const city = document.querySelector(".city");
  const sky = document.querySelector(".sky");
  const temp = document.querySelector(".temp");
  const mainIcon = document.querySelector("#climate");
  const humidity = document.querySelector(".percentage-description");
  const wind = document.querySelector(".speed-description");
  const todayMinMaxTemp = document.querySelector(".td-min-max");
  const todayIcon = document.querySelector("#today");
  const tomorrowMinMaxTemp = document.querySelector(".tm-min-max");
  const tomorrowIcon = document.querySelector("#tomorrow");
  const afterTomorrowMinMaxTemp = document.querySelector(".af-min-max");
  const afterTomorrowIcon = document.querySelector("#after-tomorrow");
  const locationIcon = document.querySelector("#locationIcon");
  const humidityIcon = document.querySelector("#humidity");
  const windIcon = document.querySelector("#wind");

  locationIcon.src = locating;
  humidityIcon.src = flux;
  windIcon.src = vent;

  city.textContent = data.location;
  sky.textContent = data.weather;
  temp.textContent = data.celsius + "°C";

  mainIcon.src = `https:${data.icon}`;

  humidity.innerHTML = `${data.humidity}% <br> humidity`;
  wind.innerHTML = `${data.windSpeed}km/h <br> Wind Speed`;

  todayMinMaxTemp.textContent = `${data.minTempCelsius}/${data.maxTempCelsius}`;
  todayIcon.src = `https:${data.iconToday}`;
  tomorrowMinMaxTemp.textContent = `${data.tm_minTempCelsius}/${data.tm_maxTempCelsius}`;
  tomorrowIcon.src = `https:${data.iconTomorrow}`;
  afterTomorrowMinMaxTemp.textContent = `${data.af_minTempCelsius}/${data.af_maxTempCelsius}`;
  afterTomorrowIcon.src = `https:${data.iconAfterTomorrow}`;

  tempBtn.onclick = () => {
    toggleCelsiusFahrenheit();
    if (tempBtn.className == "celsius") {
      temp.textContent = data.celsius + "°C";
      todayMinMaxTemp.textContent = `${data.minTempCelsius}/${data.maxTempCelsius}`;
      tomorrowMinMaxTemp.textContent = `${data.tm_minTempCelsius}/${data.tm_maxTempCelsius}`;
      afterTomorrowMinMaxTemp.textContent = `${data.af_minTempCelsius}/${data.af_maxTempCelsius}`;
    } else {
      temp.textContent = data.fahrenheit + "°F";
      todayMinMaxTemp.textContent = `${data.minTempFahrenheit}/${data.maxTempFahrenheit}`;
      tomorrowMinMaxTemp.textContent = `${data.tm_minTempFahrenheit}/${data.tm_maxTempFahrenheit}`;
      afterTomorrowMinMaxTemp.textContent = `${data.af_minTempFahrenheit}/${data.af_maxTempFahrenheit}`;
    }
  };
  changeBgClrBasedOnTime(data);
}
async function fetchData(loc) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=e65282bfa1514e07927143126241906&q=${loc}&days=3&aqi=no&alerts=no`
    );
    if (!response.ok) throw new Error("oops");
    const data = await response.json();
    displayInfos(data);
  } catch (err) {
    console.error(err);
  }
}
takeLocation();
