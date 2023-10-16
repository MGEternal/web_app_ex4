self.addEventListener('message', (e) => {
    if (e.data === 'start') {
        startTimer();
    } else if (e.data === 'stop') {
        stopTimer();
    }
});
let timerInterval;
let isRunning = false;
function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timerInterval = setInterval(() => {
            const currentTime = new Date();
            const formattedTime = formatDate(currentTime);
            self.postMessage(formattedTime);
        }, 1000); // Update every second
    }
}
function stopTimer() {
    if (isRunning) {
        isRunning = false;
        clearInterval(timerInterval);
    }
}
function formatDate(date) {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    const day = days[date.getUTCDay()];
    const month = months[date.getUTCMonth()];
    const dateNum = date.getUTCDate();
    const year = date.getUTCFullYear();
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const seconds = date.getUTCSeconds();
    const utcOffsetHours = Math.floor(date.getTimezoneOffset() / 60);
    const utcOffsetMinutes = Math.abs(date.getTimezoneOffset() % 60);
    const utcOffsetString = `${utcOffsetHours >= 0 ? '+' : '-'}${String(utcOffsetHours).padStart(2, '0')}${String(utcOffsetMinutes).padStart(2, '0')}`;
    return `${day} ${month} ${dateNum} ${year} ${hours}:${minutes}:${seconds} GMT${utcOffsetString} (Indochina Time)`;
}
