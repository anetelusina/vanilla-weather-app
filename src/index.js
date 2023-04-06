let h1 = document.querySelector("h1");
let h2 = document.querySelector("h2");

function showTime() {
  let now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();

  if (minutes < 10) {
    return `${hours}:0${minutes}`;
  } else {
    return `${hours}:${minutes}`;
  }
}

function showDay() {
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[now.getDay()];
}

function showDate() {
  let now = new Date();
  let date = now.getDate();

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let currentMonth = months[now.getMonth()];

  let fullDate = currentMonth + " " + date;
  return fullDate;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function showAll() {
  let currentTime = document.querySelector("#current-time");
  currentTime.innerHTML = showTime();

  let currentDay = document.querySelector("#current-day");
  currentDay.innerHTML = showDay();

  let currentDate = document.querySelector("#current-date");
  currentDate.innerHTML = showDate();
}

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#enter-city").value;
  let apiKey = "8ebe5at6a2e3oa0fbc8336f4afd097c4";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row week-days">`;

  forecast.forEach(function (forecastDay, index) {
    // could add if if (index < 6 && index > 0) to hide today's forecast temp
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col">
          ${formatDay(forecastDay.time)}  
         

        <div class="row weather-icons justify-content-center">

          <div>
          <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
            forecastDay.condition.icon
          }.png"
          </div>
          
        </div>
        <div class="row temperature-forecast">
          <div>${Math.round(
            forecastDay.temperature.maximum
          )}° <span class="min-temperature">${Math.round(
          forecastDay.temperature.minimum
        )}°</span></div>
        </div>
      </div>
      </div> `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(city) {
  console.log(city);
  let apiKey = "8ebe5at6a2e3oa0fbc8336f4afd097c4";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function showWeather(response) {
  let weatherConditions = document.querySelector("#weather");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let iconElement = document.querySelector("#weather-icon");
  let temperatureElement = document.querySelector("#temperature");

  celsiusTemperature = response.data.temperature.current;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  h2.innerHTML = response.data.city;
  weatherConditions.innerHTML = response.data.condition.description;
  humidity.innerHTML = response.data.temperature.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute("src", response.data.condition.icon_url);

  getForecast(response.data.city);
}

function showGeolocation(position) {
  navigator.geolocation.getCurrentPosition(showGeolocation);
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "8ebe5at6a2e3oa0fbc8336f4afd097c4";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

let geolocationButton = document.querySelector("#geolocation-button");

let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", searchCity);

geolocationButton.addEventListener("click", showGeolocation);

showAll();
