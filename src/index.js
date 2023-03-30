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

function showWeather(response) {
  let temperature = Math.round(response.data.temperature.current);
  let weatherConditions = document.querySelector("#weather");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let iconElement = document.querySelector("#weather-icon");

  h1.innerHTML = `${temperature}°C`;
  h2.innerHTML = response.data.city;
  weatherConditions.innerHTML = response.data.condition.description;
  humidity.innerHTML = response.data.temperature.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
}

function showGeolocation(position) {
  navigator.geolocation.getCurrentPosition(showGeolocation);
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "8ebe5at6a2e3oa0fbc8336f4afd097c4";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

showAll();

let cityForm = document.querySelector("#city-form");
let geolocationButton = document.querySelector("#geolocation-button");

geolocationButton.addEventListener("click", showGeolocation);

cityForm.addEventListener("submit", searchCity);
