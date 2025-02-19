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
let palabras = []; // Arreglo para almacenar las palabras de cada jugador
const LIMITE = 5; // Límite de palabras a mostrar

// Recuperar los nombres de los jugadores desde localStorage
function loadPlayers() {
    const numPlayers = localStorage.getItem('numPlayers');
    for (let i = 0; i < numPlayers; i++) {
        players.push(localStorage.getItem(`playerName${i}`));
        palabras[i] = []; // Inicializar el arreglo de palabras para cada jugador
    }
}

// Función para generar una letra aleatoria
function generateRandomLetter() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const randomIndex = Math.floor(Math.random() * letters.length);

    randomLetter = letters[randomIndex];
    randomWordContainer.textContent = randomLetter;
    // Habilitar el input
    wordInput.disabled = false;
    
    startTimer();
    updateCurrentPlayer();
}

// Función para temporizador
function startTimer() {
    timeLeft = 60; 
    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;

        if (timeLeft <= 0) {
            clearInterval(timer);
            alert("¡Se acabó el tiempo!");
            // Bloquear input
            wordInput.disabled = true; 
            switchPlayer(); 
        }
    }, 1000);
}

// Función para agregar las palabras
function addWordToList() {
    const word = wordInput.value.trim();
    if (word && word[0].toUpperCase() === randomLetter) {
        palabras[currentPlayerIndex].push(word); // Almacenar la palabra en el arreglo del jugador actual
        if (palabras[currentPlayerIndex].length <= LIMITE) {
            const row = document.createElement("tr");
            const rowNew = document.createElement("td");

            // Mostrar palabras
            rowNew.textContent = word;
            row.appendChild(rowNew);
            wordList.appendChild(row);
        }
        // Limpiar el input
        wordInput.value = ""; 
    } else if (word) {
        alert(`La palabra debe comenzar con la letra "${randomLetter}".`);
        wordInput.value = ""; 
    }
}

wordInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        addWordToList();
    }
});

// Función para cambiar al siguiente jugador
function switchPlayer() {
    // Verificar si es el último jugador
    if (currentPlayerIndex === players.length - 1) {
        // Si es el último jugador, finalizar el juego
        finalizarJuego();
    } else {
        // Cambiar al siguiente jugador
        currentPlayerIndex = (currentPlayerIndex + 1) % players.length; 
        // Limpiar palabras del jugador anterior
        wordList.textContent = ""; 
        generateRandomLetter();
    }
};

// Función para finalizar el juego y redirigir a la página de resultados
function finalizarJuego() {
    // Almacenar las palabras de cada jugador en localStorage
    const numPlayers = localStorage.getItem('numPlayers');
    for (let i = 0; i < numPlayers; i++) {
        // Almacenar palabras en localStorage
        const playerWords = JSON.stringify(palabras[i]); 
        localStorage.setItem(`playerWords${i}`, playerWords); 
    }

    // Redirigir a la página de resultados
    setInterval(() => {
        window.location.href = '../templates/result.html';
    }, 100);
}

// Función para actualizar el nombre del jugador actual
function updateCurrentPlayer() {
    playerNameDisplay.textContent = players[currentPlayerIndex]; 
}

// Generar una letra aleatoria al cargar la página
window.onload = () => {
    loadPlayers();
    generateRandomLetter();
    updateCurrentPlayer(); 
};

nextTurnButton.addEventListener("click", () => {
    switchPlayer();
});