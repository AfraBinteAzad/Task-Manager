
function updateTime() {
    const now = new Date();
    const time = now.toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
    });
    const date = now.toLocaleDateString([], { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });

    document.querySelector('.time-text').textContent = time;
    document.querySelector('.date-text').textContent = date;
}

updateTime();
setInterval(updateTime, 1000);



const weatherCodes = {
  0: '☀️', 1: '🌤️', 2: '⛅', 3: '☁️', 
  45: '🌫️', 48: '🌫️', 51: '🌧️', 53: '🌧️', 
  55: '🌧️', 56: '🌧️', 57: '🌧️', 61: '🌧️', 
  63: '🌧️', 65: '🌧️', 80: '🌧️', 81: '🌧️', 
  82: '🌧️', 71: '❄️', 73: '❄️', 75: '❄️', 
  77: '❄️', 85: '❄️', 86: '❄️', 95: '⛈️', 
  96: '⛈️', 99: '⛈️'
};

async function fetchWeather() {
  try {

    const position = await new Promise((resolve, reject) => 
      navigator.geolocation.getCurrentPosition(resolve, reject));
    
    
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&current_weather=true`
    );
    const data = await response.json();
    const { temperature, weathercode } = data.current_weather;


    document.querySelector('.weather-icon').textContent = weatherCodes[weathercode] || '🌈';
    document.querySelector('.weather-temp').textContent = `${temperature}°C`;
    document.querySelector('.weather-desc').textContent = 
      weathercode === 0 ? 'Sunny' : weathercode < 50 ? 'Cloudy' : 'Rain/Snow';
    
  } catch (error) {
    console.error("Weather fetch failed:", error);
    document.querySelector('.weather-widget').style.opacity = '0.7';
  }
}


fetchWeather();
setInterval(fetchWeather, 30 * 60 * 1000);


