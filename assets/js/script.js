// variables 
let searchButton = document.getElementById('search-btn');
let deleteButton = document.getElementById('delete-btn');
let citySearchEl = document.getElementById ('city-search');
let cityListEl = document.getElementById ('city-history-list');
let cityButton = document.getElementsByClassName ('city-history');
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

    let savedCities = {};
    
    function saveCity(city) {
        if (savedCities[city]) {
            savedCities[city].textContent = city;
        } else {
            let newCityDiv = document.createElement ("div");
            newCityDiv.className = "input-group mb-1 d-flex";
    
            newCityDiv.innerHTML = `
            <div class="input-group mb-1 d-flex">
                <button class="city-history btn btn-primary flex-grow-1">
                    ${city}
                </button>
                <button id="delete-btn" class="btn btn-primary flex-grow-0">
                    <i class="fa-solid fa-minus"></i>
                </button>
            </div>`;
    
            let parentDiv = document.querySelector(".city-history-list");
            parentDiv.appendChild(newCityDiv);
            savedCities[city] = newCityDiv;
        }

        //saves the city button to the local storage
        localStorage.setItem("savedCities", JSON.stringify(Object.keys(savedCities)));

    }

    // resets the search bar back to the placeholder city name
    citySearchEl.value = '';
    citySearchEl.placeholder = 'San Diego';

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

            weatherIconEl.setAttribute("src", `https://openweathermap.org/img/w/${data.weather[0].icon}.png`);

            saveCity(data.name);

        })
}

// displays the weather for San Diego on page load as a deafult city
window.onload = function() {
    citySearchEl.value = 'San Diego';
    getWeather();
}

searchButton.addEventListener('click', getWeather);

// displays the weather for the saved city the user clicks on
document.querySelector('.city-history-list').addEventListener('click', function(event) {
    if (event.target.classList.contains('city-history')) {
        //checks to see if the button clicked is a city button
        let cityName = event.target.textContent;
        citySearchEl.value = cityName
        getWeather();
    }
});
