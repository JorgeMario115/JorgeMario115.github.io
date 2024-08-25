document.addEventListener('DOMContentLoaded', () => {
    const fieldButtons = document.querySelectorAll('#instrument-1 .fieldButton');
    const noteCount = 4; // Número de notas que queremos criar
    const lasers = []; // Array para armazenar os lasers ativos

    // Função para criar um laser
    function createLaser(button) {
        const laser = document.createElement('div');
        laser.className = 'laser';
        laser.style.left = `${button.offsetLeft + button.clientWidth / 2 - 2.5}px`; // Centraliza o laser horizontalmente
        laser.style.top = '0px'; // Começa do topo
        laser.style.height = `${button.clientHeight}px`; // Estende-se verticalmente
        document.body.appendChild(laser);

        // Mostra o laser e depois o esconde após um curto período
        laser.style.opacity = '1';
        setTimeout(() => {
            laser.style.opacity = '0';
            setTimeout(() => laser.remove(), 200); // Remove o laser após a animação
        }, 200); // Duração da visibilidade do laser
    }

    // Função para criar uma nota
    function createNote() {
        const note = document.createElement('div');
        note.className = 'note';
        note.style.width = '30px'; // Ajuste o tamanho da nota conforme necessário
        note.style.height = '30px'; // Ajuste o tamanho da nota conforme necessário
        note.style.position = 'absolute';

        // Escolhe aleatoriamente um dos campos de botão
        const randomButton = fieldButtons[Math.floor(Math.random() * fieldButtons.length)];
        const buttonRect = randomButton.getBoundingClientRect();
        note.style.left = `${Math.random() * (buttonRect.width - 30)}px`;
        note.style.top = '0px';
        randomButton.appendChild(note);

        let posY = 0;
        function animate() {
            posY += 2;
            note.style.top = `${posY}px`;
            if (posY < randomButton.clientHeight - note.clientHeight) {
                requestAnimationFrame(animate);
            } else {
                note.remove();
            }
        }
        animate();
    }

    // Cria várias notas inicialmente
    for (let i = 0; i < noteCount; i++) {
        createNote();
    }

    // Cria uma nova nota a cada 2 segundos
    setInterval(createNote, 2000);

    // Função para simular o clique em um botão
    function simulateButtonClick(button) {
        button.classList.add('active');
        setTimeout(() => {
            button.classList.remove('active');
        }, 200); // Tempo para simular o clique
    }

    // Adiciona eventos para as teclas pressionadas
    document.addEventListener('keydown', (event) => {
        const key = event.code;
        const buttonIndex = parseInt(key.replace('Key', '')) - 1;

        if (buttonIndex >= 0 && buttonIndex < fieldButtons.length) {
            const button = fieldButtons[buttonIndex];
            createLaser(button);
            simulateButtonClick(button);

            // Remove notas que estão dentro do botão acionado
            const notes = document.querySelectorAll('.note');
            notes.forEach(note => {
                const noteRect = note.getBoundingClientRect();
                const buttonRect = button.getBoundingClientRect();
                if (noteRect.left >= buttonRect.left &&
                    noteRect.right <= buttonRect.right &&
                    noteRect.top >= buttonRect.top &&
                    noteRect.bottom <= buttonRect.bottom) {
                    note.remove();
                }
            });
        }
    });
});
