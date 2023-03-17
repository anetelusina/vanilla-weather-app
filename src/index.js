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
  let apiKey = "a57953e8358331d820119b9c69a6c518";
  apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function showWeather(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.main.temp);
  let weatherConditions = document.querySelector("#weather");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");

  h1.innerHTML = `${temperature}°C`;
  h2.innerHTML = response.data.name;
  weatherConditions.innerHTML = response.data.weather[0].main;
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed);
}

function showGeolocation(position) {
  navigator.geolocation.getCurrentPosition(showGeolocation);
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "a57953e8358331d820119b9c69a6c518";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

showAll();

let cityForm = document.querySelector("#city-form");
let geolocationButton = document.querySelector("#geolocation-button");

geolocationButton.addEventListener("click", showGeolocation);

cityForm.addEventListener("submit", searchCity);
