import "./styles/main.css";
import "@fontsource/roboto-slab";

const userText = document.getElementById("text");
const submit = document.getElementById("submit");
const container = document.getElementById("container");
const cityName = document.getElementById("city-name");
const temp = document.getElementById("temp");
const feelsLike = document.getElementById("feels-like");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");

const displayFetch = document.getElementById('timeToFetch')

const errorDiv = document.getElementById("errorMsg");
container.style.display = "none";

submit.addEventListener("click", (e) => {
  e.preventDefault();
  container.style.display = "block";
  displayFetch.innerText = ""
  let userValue = userText.value;
  getWeather(userValue);
});

async function getWeather(searchString) {
  console.log(searchString);
  if (!searchString || searchString.length < 1) {
    container.style.display = "none";
    errorDiv.innerText = "Empty search!";
    return;
  }
  try {
    const api_key = "7e692b5340f44a53bbb203948231509";
    const start = performance.now()
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${api_key}&q=${searchString}`,
      { mode: "cors" }
    );
    const end = performance.now();
    const fetchTime = end - start;
    displayFetchTime(fetchTime)
    if (!response.ok) {
      container.style.display = "none";
      errorDiv.innerText = ` Error ${response.status}, maybe check what you typed in is an actual city`;
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const weatherResponse = await response.json();
    container.style.display = "block";
    errorDiv.innerText = "";
    console.log(weatherResponse);
    displayData(weatherResponse);
  } catch (error) {
    console.log(`failed to fetch weather Data, ${error}`);
  }
}

function displayData(weatherData) {
  const name = weatherData.location.name;
  cityName.innerText = name;

  const temperature = weatherData.current.temp_c;
  temp.innerText = `Temperature: ${temperature}°C`;

  const tempFeelsLike = weatherData.current.feelslike_c;
  feelsLike.innerText = `Temperature feels like: ${tempFeelsLike}°C`;

  const humidityPercent = weatherData.current.humidity;
  humidity.innerText = `Humidity: ${humidityPercent}%`;

  const windSpeed = weatherData.current.wind_mph;
  wind.innerText = `Wind speed: ${windSpeed} mph`;
}

function displayFetchTime(fetchTime) {
displayFetch.innerText = `Request took ${Math.round(fetchTime)} ms`
}