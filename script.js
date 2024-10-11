const apiKey = 'd9a95be1e46eb299df47670fb8166c27'; // Keep your actual API key here

document.getElementById('search-btn').addEventListener('click', getWeather);
document.getElementById('time-icon').addEventListener('click', toggleContent.bind(null, 'time'));
document.getElementById('calendar-icon').addEventListener('click', toggleContent.bind(null, 'calendar'));
document.getElementById('weather-icon').addEventListener('click', toggleContent.bind(null, 'weather'));
document.getElementById('alarm-icon').addEventListener('click', toggleContent.bind(null, 'alarm'));

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

function toggleContent(type) {
    const contents = ['time', 'calendar', 'weather', 'alarm'];
    contents.forEach(item => {
        const contentDiv = document.getElementById(`${item}-content`);
        if (item === type) {
            contentDiv.style.display = contentDiv.style.display === 'block' ? 'none' : 'block';
            if (item === 'calendar') {
                renderCalendar(); // Call the renderCalendar function for the calendar
                displayCurrentDate(); // Display the current date when calendar is shown
            }
        } else {
            contentDiv.style.display = 'none'; // Hide other contents
        }
    });

    if (type === 'time') {
        updateTime();
    }
}

function updateTime() {
    const currentTime = new Date().toLocaleTimeString();
    document.getElementById('current-time').textContent = `Current Time: ${currentTime}`;
}

function renderCalendar() {
    const calendarElement = document.getElementById('calendar');
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const today = date.getDate(); // Get the current day

    // Set the first day of the month
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    // Clear the calendar
    calendarElement.innerHTML = '';

    // Create empty slots for the days before the first day
    for (let i = 0; i < startingDay; i++) {
        const emptyDiv = document.createElement('div');
        calendarElement.appendChild(emptyDiv);
    }

    // Fill in the calendar with days and highlight the current day
    for (let day = 1; day <= daysInMonth; day++) {
        const dayDiv = document.createElement('div');
        dayDiv.textContent = day;

        // Highlight the current day
        if (day === today) {
            dayDiv.style.backgroundColor = '#ffeb3b'; // Highlight color (yellow)
            dayDiv.style.color = '#000'; // Text color for contrast (black)
        }

        calendarElement.appendChild(dayDiv);
    }
}

// Function to display the current date, month, and year
function displayCurrentDate() {
    const currentDateElement = document.getElementById('calendar-header');
    const date = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    currentDateElement.textContent = date.toLocaleDateString('en-US', options);
}

// Call renderCalendar on page load to show current month's calendar
renderCalendar();
