async function sendGameRequest(game) {
    const url = '/setGame';
    const data = { game: game };

    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (res.ok) {
            window.location.href = '/';
        } else {
            throw new Error('Erro na comunicação com o servidor');
        }
    } catch (error) {
        console.error(error);
    }
}

let lastPercentages = {}; // Para armazenar a última porcentagem de cada jogo

function getRandomPercentageForHourAndGame(hour, gameName) {
    const basePercentage = 5;
    const maxPercentage = 95;
    
    // Calcula o número de intervalos de 3 minutos desde o início do dia
    const currentTime = new Date();
    const intervalsSinceStartOfDay = Math.floor((currentTime.getHours() * 60 + currentTime.getMinutes()) / 3);
    
    // Usa o intervalo e o nome do jogo como semente para o gerador de números pseudo-aleatórios
    const seed = intervalsSinceStartOfDay + gameName.charCodeAt(0) + gameName.charCodeAt(gameName.length - 1);
    
    // Simula um gerador de números pseudo-aleatórios simples (não é perfeito, mas serve para este propósito)
    const pseudoRandom = Math.sin(seed) * 10000 - Math.floor(Math.sin(seed) * 10000);
    
    // Calcula a porcentagem com base no pseudoRandom
    const percentage = basePercentage + pseudoRandom * (maxPercentage - basePercentage);

    return Math.floor(percentage);
}





function updateProgressBars() {
    const games = document.querySelectorAll('.game-link');
    const currentHour = new Date().getHours();

    games.forEach(game => {
        const progressBarContainer = game.querySelector('.progress-container'); 
        
        if (progressBarContainer) {
            game.removeChild(progressBarContainer);
        }

        const newProgressBarContainer = document.createElement('div');
        newProgressBarContainer.className = 'progress-container text-center';
        newProgressBarContainer.style.margin = 'auto';

        const newProgressBar = document.createElement('div');
        newProgressBar.className = 'progress mx-auto';
        newProgressBar.style.width = '120px';

        const gameName = game.getAttribute('data-game');
        const randomPercentage = getRandomPercentageForHourAndGame(currentHour, gameName);

        const barColor = randomPercentage < 50 ? "bg-danger" : "bg-success";

        newProgressBar.innerHTML = `
            <div class="progress-bar ${barColor}" role="progressbar" style="width: ${randomPercentage}%; color: black; font-weight: bold" aria-valuenow="${randomPercentage}" aria-valuemin="0" aria-valuemax="100">${randomPercentage}%</div>
        `;

        newProgressBarContainer.appendChild(newProgressBar);

        // Calcula o número de intervalos de 3 minutos desde o início do dia
        const currentTime = new Date();
        const intervalsSinceStartOfDay = Math.floor((currentTime.getHours() * 60 + currentTime.getMinutes()) / 3);
        
        // Usa o intervalo e o nome do jogo como semente para calcular minutos adicionais (1 a 3 minutos)
        const seed = intervalsSinceStartOfDay + gameName.charCodeAt(0) + gameName.charCodeAt(gameName.length - 1);
        const additionalMinutes = 1 + (seed % 3);  // Determina um valor entre 1 e 3

        currentTime.setMinutes(currentTime.getMinutes() + additionalMinutes);
        const timeDisplay = `${currentTime.getHours().toString().padStart(2, '0')}:${currentTime.getMinutes().toString().padStart(2, '0')}`;
        
        const timeSpan = document.createElement('span');
        timeSpan.className = "d-block mt-1";
        timeSpan.innerText = timeDisplay;

        newProgressBarContainer.appendChild(timeSpan);

        game.appendChild(newProgressBarContainer);
    });
}







updateProgressBars();

// Agende a função updateProgressBars para ser chamada a cada 3 minutos (180000 milissegundos)
setInterval(updateProgressBars, 180000);

function reveal() {
    let reveals = document.querySelectorAll('.reveal');

    for (let p = 0; p < reveals.length; p++) {
        let elementTop = reveals[p].getBoundingClientRect().top;

        if (elementTop < window.innerHeight * 1.2) {
            reveals[p].classList.add('revealed');
        }
    }
}

window.onscroll = reveal;
window.onload = reveal;
