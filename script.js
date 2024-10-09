const apiKey = 'd9a95be1e46eb299df47670fb8166c27'; // Keep your actual API key here

document.getElementById('search-btn').addEventListener('click', getWeather);

async function getWeather() {
    const city = document.getElementById('city-input').value;
    const weatherInfoDiv = document.getElementById('weather-info');
    const body = document.body;

    // Check if the city input is empty
    if (city === '') {
        weatherInfoDiv.innerHTML = '<p>Please enter a city name.</p>';
        return;
    }

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        
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
        const feelsLike = data.main.feels_like; // Get 'feels like' temperature
        const weatherCondition = data.weather[0].description;
        const humidity = data.main.humidity;

        // Display the weather information, including the "Feels Like" temperature
        weatherInfoDiv.innerHTML = `
            <h3>Weather in ${data.name}</h3>
            <p>Temperature: ${temperature} °C</p>
            <p>Feels Like: ${feelsLike} °C</p> <!-- New Feels Like info -->
            <p>Condition: ${weatherCondition}</p>
        `;

        // Change the background color of the entire body based on temperature
        if (temperature < 0) {
            body.style.backgroundColor = '#00f'; // Cold: Blue for freezing temps
        } else if (temperature >= 0 && temperature < 15) {
            body.style.backgroundColor = '#4fc3f7'; // Cool: Light blue for mild cool
        } else if (temperature >= 15 && temperature < 25) {
            body.style.backgroundColor = '#ffeb3b'; // Warm: Yellow for moderate warmth
        } else {
            body.style.backgroundColor = '#f44336'; // Hot: Red for high temps
        }

    } catch (error) {
        console.error('Error fetching weather data:', error);
        weatherInfoDiv.innerHTML = `<p>There was an error fetching the weather data. Please try again.</p>`;
    }
}
