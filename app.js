const backgrounds = ['bg.jpg'];

const randomBg = backgrounds[Math.floor(Math.random() * backgrounds.length)];
document.body.style.backgroundImage = `url('${randomBg}')`;

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


