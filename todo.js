
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];


const taskList = document.getElementById('taskList');
const newTaskInput = document.getElementById('newTask');


function renderTasks() {
    taskList.innerHTML = '';
    
    tasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.className = 'task-item';
        taskItem.innerHTML = `
            <input type="checkbox" id="task-${index}" ${task.completed ? 'checked' : ''}>
            <label for="task-${index}" class="${task.completed ? 'completed' : ''}">${task.text}</label>
            <button class="delete-btn" onclick="removeTask(${index})">×</button>
        `;
        taskItem.querySelector('input').addEventListener('change', () => toggleTask(index));
        taskList.appendChild(taskItem);
    });
    
    updateProgress();
}


function addTask() {
    const taskText = newTaskInput.value.trim();
    if (taskText) {
        tasks.push({ text: taskText, completed: false });
        saveTasks();
        newTaskInput.value = '';
        renderTasks();
    }
}


function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}


function removeTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}


function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


function updateProgress() {
    const completedTasks = tasks.filter(task => task.completed).length;
    const progress = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;
    localStorage.setItem('progress', progress);
}


function init() {
    renderTasks();
    
    function updateTime() {
        const now = new Date();
        document.getElementById('currentTime').textContent = 
            now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        document.getElementById('currentDate').textContent = 
            now.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' });
    }
    updateTime();
    setInterval(updateTime, 1000);
}

init();

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
