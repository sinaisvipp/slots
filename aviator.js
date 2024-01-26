const plane = document.getElementById('plane');
const analyzeButton = document.getElementById('analyzeButton');
const message = document.getElementById('message');
const exitText = document.getElementById('exitText');
const exitValue = document.getElementById('exitValue');
const countdownText = document.getElementById('countdownText');

analyzeButton.addEventListener('click', () => {
    analyzeButton.style.display = 'none';
    hackSystem();
});

function hackSystem() {
    const messages = [
        "HACKEANDO PLATAFORMA",
        "CRIANDO PONTO SEGURO",
        "ANALISANDO ENTRADA"
    ];
    let index = 0;

    function showMessage() {
        if (index < messages.length) {
            message.textContent = messages[index];
            index++;
            setTimeout(showMessage, 4000);
        } else {
            message.style.display = 'none';
            exitText.style.display = 'block';
            plane.style.display = 'none';
            const randomValue = (Math.random() * 1.7 + 1.2).toFixed(2) + 'x';
            exitValue.textContent = randomValue;
            startCountdown();
        }
    }

    message.style.display = 'block';
    showMessage();
}

function startCountdown() {
    let timeLeft = 60;
    countdownText.textContent = formatTime(timeLeft);
    countdownText.style.display = 'block';

    const interval = setInterval(() => {
        timeLeft--;
        countdownText.textContent = formatTime(timeLeft);

        if (timeLeft === 0) {
            clearInterval(interval);
            resetPage();
            plane.style.display = 'block';
        }
    }, 1000);
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

function resetPage() {
    countdownText.style.display = 'none';
    exitText.style.display = 'none';
    analyzeButton.style.display = 'block';
}
