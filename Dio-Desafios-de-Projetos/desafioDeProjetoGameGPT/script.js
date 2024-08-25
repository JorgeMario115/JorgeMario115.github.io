document.addEventListener('DOMContentLoaded', () => {
    let isDevMode = false;
    let keyPresses = [];

    // Configuração do Phaser
    const config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        scene: {
            preload: preload,
            create: create,
            update: update
        }
    };

    const game = new Phaser.Game(config);
    const canvas = document.getElementById('gameCanvas');
    // const context = canvas.getContext('2d');
    const startNote = document.getElementById('start-note');

    // Configurar o canvas para ter o mesmo tamanho da tela
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Carregar a API do YouTube
    let player;

    // Função de inicialização da API do YouTube
    function onYouTubeIframeAPIReady() {
        player = new YT.Player('backgroundVideo', {
            events: {
                'onReady': onPlayerReady
            }
        });
    }

    // Função chamada quando o player está pronto
    function onPlayerReady(event) {
        console.log('YouTube player is ready');
    }

    // Função para desenhar o vídeo no canvas
    function draw() {
        // Adapte isso conforme necessário
        // Você pode usar a API do YouTube para mostrar ou ocultar o vídeo
    }

    // Manipulador de eventos para iniciar o vídeo quando a nota for clicada
    startNote.addEventListener('click', () => {
        if (player) {
            player.playVideo(); // Inicia o vídeo
            console.log('Video started with click');
        }
    });

    // Manipulador de eventos para iniciar o vídeo com a tecla Enter
    document.addEventListener('keydown', (event) => {
        if (event.code === 'Enter') { // Detecta a tecla Enter
            if (player) {
                player.playVideo(); // Inicia o vídeo
                console.log('Video started with Enter key');
            }
        }
    });

    function preload() {
        // Carregar imagens ou outros recursos necessários
        this.load.image('note', 'url_da_imagem_da_nota');
    }

    function create() {
        // Adiciona as áreas de instrumentos ao Phaser
        this.instrumentFields = [];
        this.instrumentFields.push(this.add.dom(0, 0).createFromHTML(document.getElementById('instrument-1').outerHTML));
        this.instrumentFields.push(this.add.dom(0, 0).createFromHTML(document.getElementById('instrument-2').outerHTML));
        this.instrumentFields.push(this.add.dom(0, 0).createFromHTML(document.getElementById('instrument-3').outerHTML));

        // Configura o Tone.js
        this.synth = new Tone.Synth().toDestination();
        this.music = new Tone.Player("url_da_musica.mp3").toDestination();

        // Interações do teclado
        this.input.keyboard.on('keydown', handleKey, this);

        // Notas começam a se mover horizontalmente da direita para a esquerda
        this.notes = this.physics.add.group();
        createNote(this, 800, 100); // Exemplo de nota criada no campo 1
        createNote(this, 800, 250); // Exemplo de nota criada no campo 2
    }

    function update() {
        // Atualizações a cada frame
        this.notes.children.each(function(note) {
            note.x -= 2; // Move a nota horizontalmente para a esquerda
            if (note.x < 0) {
                note.destroy(); // Remove a nota quando ela sai da tela
            }
        }, this);
    }

    function handleKey(event) {
        const currentTime = this.music.now();

        if (isDevMode) {
            keyPresses.push({ key: event.code, time: currentTime });
            console.log(`Tecla ${event.code} pressionada em ${currentTime}s`);
        }

        switch(event.code) {
            case 'KeyA':
                this.synth.triggerAttackRelease('C4', '8n');
                break;
            case 'KeyS':
                this.synth.triggerAttackRelease('D4', '8n');
                break;
            // Adicione mais teclas conforme necessário
        }
    }

    function createNote(scene, x, y) {
        let note = scene.notes.create(x, y, 'note');
        note.setVelocityX(-200); // Configura a velocidade da nota para a esquerda
    }

    function startDevMode() {
        isDevMode = true;
        keyPresses = [];
        game.scene.scenes[0].music.start();
    }

    function startGame() {
        isDevMode = false;
        game.scene.scenes[0].music.start();
    }

    document.getElementById('startGame').addEventListener('click', startGame);
    document.getElementById('startDevMode').addEventListener('click', startDevMode);

    function showDevData() {
        if (isDevMode) {
            console.log("Dados de desenvolvimento:", JSON.stringify(keyPresses));
            alert("Dados de desenvolvimento salvos no console!");
        }
    }

    window.addEventListener('beforeunload', showDevData);

    // Carregar o script da API do YouTube
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
});
