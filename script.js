// API key for OpenWeatherMap (you can get your own key for free)
const apiKey = 'd9a95be1e46eb299df47670fb8166c27'; // Keep your actual API key here

document.getElementById('search-btn').addEventListener('click', getWeather);

async function getWeather() {
    const city = document.getElementById('city-input').value;
    const weatherInfoDiv = document.getElementById('weather-info');

    // Check if the city input is empty
    if (city === '') {
        weatherInfoDiv.innerHTML = '<p>Please enter a city name.</p>';
        return;
    }

    try {
        // Use the apiKey variable here
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        
        // Check if the response is OK
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Check for a 404 error in the response
        if (data.cod === '404') {
            weatherInfoDiv.innerHTML = `<p>City not found. Please try again.</p>`;
            return;
        }

        const temperature = data.main.temp;
        const weatherCondition = data.weather[0].description;
        const humidity = data.main.humidity;

        // Display the weather information
        weatherInfoDiv.innerHTML = `
            <h3>Weather in ${data.name}</h3>
            <p>Temperature: ${temperature} °C</p>
            <p>Condition: ${weatherCondition}</p>
            <p>Humidity: ${humidity}%</p>
        `;
    } catch (error) {
        // Display the error message
        console.error('Error fetching weather data:', error);
        weatherInfoDiv.innerHTML = `<p>There was an error fetching the weather data. Please try again.</p>`;
    }
}
