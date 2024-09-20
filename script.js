const apiKey = '16e9ad234c466a4818f5c407fa5434ff';

// Fetch current weather
function getWeather() {
    const location = document.getElementById('locationInput').value;
    fetchWeather(location);
    getHourlyForecast(location);
}

// Fetch weather for entered location
function fetchWeather(location) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const country = data.sys.country;
            const units = country === 'US' ? 'imperial' : 'metric'; // Use Fahrenheit for US, Celsius for others
            fetchWeatherWithUnits(location, units);
        });
}

function fetchWeatherWithUnits(location, units) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${units}&appid=${apiKey}`;
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data, units);
        });
}

// Display weather details with correct units
function displayWeather(data, units) {
    const weatherDetails = document.getElementById('weatherDetails');
    const temp = data.main.temp;
    const description = data.weather[0].description;
    const city = data.name;
    const country = data.sys.country;
    const temperatureUnit = units === 'imperial' ? '°F' : '°C';

    weatherDetails.innerHTML = `
        <h4>${city}, ${country}</h4>
        <p>${Math.round(temp)}${temperatureUnit}</p>
        <p>${description}</p>
    `;
}

// Fetch hourly forecast
function getHourlyForecast(location) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}`;
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const country = data.city.country;
            const units = country === 'US' ? 'imperial' : 'metric'; // Use Fahrenheit for US, Celsius for others
            displayHourlyForecast(data, units);
        });
}

// Display the hourly forecast for the next 6 hours
function displayHourlyForecast(data, units) {
    const hourlyForecast = document.getElementById('hourlyForecast');
    hourlyForecast.innerHTML = ''; // Clear previous data

    const temperatureUnit = units === 'imperial' ? '°F' : '°C';

    data.list.slice(0, 6).forEach((hour) => {
        const temp = hour.main.temp;
        const description = hour.weather[0].description;
        const time = new Date(hour.dt_txt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        hourlyForecast.innerHTML += `
            <div class="hour">
                <p>${time}: ${Math.round(temp)}${temperatureUnit} - ${description}</p>
            </div>
        `;
    });
}

// Fetch 7-day forecast (Note: OpenWeatherAPI free plan doesn't support daily forecast. This would require One Call API)
function getForecast() {
    const location = document.getElementById('forecastLocationInput').value;
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&cnt=7&appid=${apiKey}`;
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const country = data.city.country;
            const units = country === 'US' ? 'imperial' : 'metric'; // Use Fahrenheit for US, Celsius for others
            displayForecast(data, units);
        });
}

// Display the 7-day forecast
function displayForecast(data, units) {
    const forecastDetails = document.getElementById('forecastDetails');
    forecastDetails.innerHTML = ''; // Clear previous data

    const temperatureUnit = units === 'imperial' ? '°F' : '°C';

    data.list.forEach((day) => {
        const temp = day.main.temp;
        const description = day.weather[0].description;

        forecastDetails.innerHTML += `
            <div class="forecast-day">
                <p>${Math.round(temp)}${temperatureUnit} - ${description}</p>
            </div>
        `;
    });
}
