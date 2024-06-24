function takeLocation() {
  let location = prompt("where do you live", "mostaganem");
  return location;
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
