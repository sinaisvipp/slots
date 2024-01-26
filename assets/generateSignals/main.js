document.addEventListener('DOMContentLoaded', function() {
    const btnGenerate = document.getElementById('btnGenerate');
    btnGenerate.addEventListener('click', getOpportunity);

    const loading = document.querySelector('#loadingMessages');
    const normalRounds = document.querySelector('#normalRounds');
    const turboRounds = document.querySelector('#turboRounds');
    const validade = document.querySelector('#validade');

    async function getOpportunity() {
        btnGenerate.disabled = true;
        setTimeout(() => {
            btnGenerate.disabled = false;
        }, 60000);

        const loadingTexts = [
            `<span class="MatrixTextEffect">Estabelecendo conexão com o servidor</span>`,
            `<span class="MatrixTextEffect">Buscando oportunidades na plataforma..</span>`,
            `<span class="MatrixTextEffect">Não atualize esta página</span>`,
            `<span class="MatrixTextEffect">ESTAMOS IDENTIFICANDO UM PADRÃO</span>`
        ];

        for (const text of loadingTexts) {
            loading.innerHTML = text;
            const contentHeight = loading.scrollHeight;
            loading.style.height = `${contentHeight}px`;
            await new Promise(resolve => setTimeout(resolve, 1500));
        }


        const simulatedResult = {
            normalRounds: Math.floor(Math.random() * 10) + 1,
            turboRounds: Math.floor(Math.random() * 10) + 1
        };


        loading.innerHTML = `<span class="MatrixTextEffect">OPORTUNIDADE IDENTIFICADA</span>`;
        const contentHeight = loading.scrollHeight;
        loading.style.height = `${contentHeight}px`;
        normalRounds.innerHTML = `<b>${simulatedResult.normalRounds} RODADAS</b>`;
        turboRounds.innerHTML = `<b>${simulatedResult.turboRounds} RODADAS</b>`;
        
        const currentTime = new Date();


        const minutesToAdd = Math.floor(Math.random() * 2) + 3;
        const validadeTime = new Date(currentTime.getTime() + minutesToAdd * 60000); 
        const hours = validadeTime.getHours();
        const minutes = validadeTime.getMinutes();
        const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        validade.innerHTML = `<b>${formattedTime}</b>`;
    }
});
