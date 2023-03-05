// variables 
let searchButton = document.getElementById('search-btn');
let deleteButton = document.getElementById('delete-btn');
let citySearchEl = document.getElementById ('city-search');
let searchHistoryEl = document.getElementById ('search-history');
let cityButton = document.getElementById ('city-history');
let currentTimeEl = document.getElementById ('current-time');
let currentDateEl = document.getElementById ('todays-date');
let currentCityNameEl = document.getElementById ('current-city');
let tempuratureEl = document.getElementById ('tempurature');
let windEl = document.getElementById ('wind');
let highLowTempEl = document.getElementById ('high-low');
let weatherIconEl = document.getElementById ('weather-icon');


// gets the weather data from the open weather api
function getWeather() {
    cityName = citySearchEl.value.trim();
    // weather API Key
    const apiKey = "65bc935147144850e7fa81b394715fd0";
    let queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`;

    fetch(queryURL)
        .then(respone => respone.json())
        .then((data) => {
            console.log(data);
            currentCityNameEl.textContent = data.name;
            tempuratureEl.textContent = Math.floor(data.main.temp) + '°F';

            windEl.innerHTML = `<i class="fa fa-wind"></i> ${data.wind.speed} MPH`;

            lowTemp = Math.floor(data.main.temp_min) + '°F';
            highTemp = Math.floor(data.main.temp_max) + '°F';

            highLowTempEl.innerHTML = `<i class="fa fa-temperature-arrow-down"></i> ${lowTemp}` + ` <i class="fa fa-temperature-arrow-up"></i> ${highTemp}`;

        })

}

searchButton.addEventListener('click', getWeather);