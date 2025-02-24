const randomWordContainer = document.getElementById("random-word");
const wordInput = document.getElementById("word-input");
const wordList = document.getElementById("word-list");
const playerNameDisplay = document.getElementById("player-name");
const nextTurnButton = document.getElementById("nextTurn");
const timerDisplay = document.getElementById("timer");

let timer;
let timeLeft = 60;
let randomLetter;
let currentPlayerIndex = 0;
let players = [];
let palabras = []; 
const LIMITE = 5; 

// Recuperar jugadores desde localStorage
function loadPlayers() {
    const numPlayers = parseInt(localStorage.getItem('numPlayers'), 10); 
    if (!numPlayers || isNaN(numPlayers)) {
        console.error("Error: numPlayers no es válido en localStorage");
        return;
    }

    for (let i = 0; i < numPlayers; i++) {
        const playerName = localStorage.getItem(`playerName${i}`);
        if (playerName) {
            players.push(playerName);
            // Iniciar el array de palabras para cada jugador
            palabras[i] = []; 
        } else {
            console.warn(`Jugador ${i} no tiene nombre guardado.`);
        }
    }
}

// Generar una letra aleatoria
function generateRandomLetter() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    randomLetter = letters[Math.floor(Math.random() * letters.length)];

    randomWordContainer.textContent = randomLetter;
    wordInput.disabled = false;
    startTimer();
    updateCurrentPlayer();
}

// Iniciar temporizador
function startTimer() {
    timeLeft = 60;
    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;

        if (timeLeft <= 0) {
            clearInterval(timer);
            alert("¡Se acabó el tiempo!");
            wordInput.disabled = true;
            switchPlayer();
        }
    }, 1000);
}

// Agregar palabra a la lista
function addWordToList() {
    const word = wordInput.value.trim().toLowerCase(); 

    if (!word) return;

    if (word[0].toUpperCase() !== randomLetter) {
        alert(`La palabra debe comenzar con la letra "${randomLetter}".`);
    } else if (palabras[currentPlayerIndex].includes(word)) { 
        //  Verificamos si el jugador ya usó esta palabra antes
        alert(`Ya ingresaste la palabra "${word}" antes. Intenta con otra.`);
    } else {
        // Agregar palabra al jugador actual
        palabras[currentPlayerIndex].push(word);

        if (palabras[currentPlayerIndex].length <= LIMITE) {
            const row = document.createElement("tr");
            const rowNew = document.createElement("td");
            rowNew.textContent = word;
            row.appendChild(rowNew);
            wordList.appendChild(row);
        }
    }

    wordInput.value = "";
}

wordInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        addWordToList();
    }
});

// Cambiar al siguiente jugador
function switchPlayer() {
    if (currentPlayerIndex === players.length - 1) {
        setTimeout(finalizarJuego, 1000);
    } else {
        currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
        wordList.textContent = "";
        generateRandomLetter();
    }
}

// Finalizar el juego y redirigir
function finalizarJuego() {
    const numPlayers = parseInt(localStorage.getItem('numPlayers'), 10);
    if (!numPlayers || isNaN(numPlayers)) {
        console.error("Error: numPlayers no es válido al finalizar el juego.");
        return;
    }

    for (let i = 0; i < numPlayers; i++) {
        if (palabras[i]) {
            localStorage.setItem(`playerWords${i}`, JSON.stringify(palabras[i]));
        }
    }

    setTimeout(() => {
        window.location.href = "../templates/result.html"; 
    }, 500);
}

// Actualizar el nombre del jugador actual
function updateCurrentPlayer() {
    playerNameDisplay.textContent = players[currentPlayerIndex] || "Jugador desconocido";
}


// Cargar jugadores y empezar juego cuando la página carga
window.onload = () => {
    loadPlayers();
    if (players.length > 0) {
        generateRandomLetter();
        updateCurrentPlayer();
    } else {
        console.error("No hay jugadores cargados.");
    }
};

// Evento para cambiar de turno
nextTurnButton.addEventListener("click", switchPlayer);
