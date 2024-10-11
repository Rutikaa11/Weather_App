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
        
        // Check if response is successful
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Check if city is found
        if (data.cod === '404') {
            weatherInfoDiv.innerHTML = `<p>City not found. Please try again.</p>`;
            body.style.backgroundColor = '#3d3d3d'; // Reset background color to default
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
            <p>Feels Like: ${feelsLike} °C</p>
            <p>Condition: ${weatherCondition}</p>
            <p>Humidity: ${humidity}%</p> <!-- Add more data if needed -->
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
        body.style.backgroundColor = '#3d3d3d'; // Reset background color to default in case of an error
    }
}
// JavaScript to handle the menu toggle functionality

document.addEventListener('DOMContentLoaded', function () {
    // Get all menu icons
    const timeIcon = document.getElementById('time-icon');
    const calendarIcon = document.getElementById('calendar-icon');
    const weatherIcon = document.getElementById('weather-icon');
    const alarmIcon = document.getElementById('alarm-icon');

    // Get all content sections
    const timeContent = document.getElementById('time-content');
    const calendarContent = document.getElementById('calendar-content');
    const weatherContent = document.getElementById('weather-content');
    const alarmContent = document.getElementById('alarm-content');

    // Hide all sections initially
    timeContent.style.display = 'none';
    calendarContent.style.display = 'none';
    weatherContent.style.display = 'none';
    alarmContent.style.display = 'none';

    // Function to toggle visibility of a section
    function toggleContent(content) {
        // Hide all sections first
        timeContent.style.display = 'none';
        calendarContent.style.display = 'none';
        weatherContent.style.display = 'none';
        alarmContent.style.display = 'none';

        // Toggle the clicked content
        if (content.style.display === 'none') {
            content.style.display = 'block';
        } else {
            content.style.display = 'none';
        }
    }

    // Event listeners for the icons
    timeIcon.addEventListener('click', function () {
        toggleContent(timeContent);
    });

    calendarIcon.addEventListener('click', function () {
        toggleContent(calendarContent);
    });

    weatherIcon.addEventListener('click', function () {
        toggleContent(weatherContent);
    });

    alarmIcon.addEventListener('click', function () {
        toggleContent(alarmContent);
    });
});
