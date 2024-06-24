function takeLocation() {
  let location = prompt("where do you live", "mostaganem");
  return location;
}
function extractRequiredData(data) {
  const neededData = {
    location: data["location"]["region"],
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
async function fetchData() {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=e65282bfa1514e07927143126241906&q=${takeLocation()}&days=3&aqi=no&alerts=no`
    );
    if (!response.ok) throw new Error("oops");
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}
fetchData();
