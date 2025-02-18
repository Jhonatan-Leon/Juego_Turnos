const randomWordContainer = document.getElementById("random-word");
const wordInput = document.getElementById("word-input");
const wordList = document.getElementById("word-list");

let timer;
let timeLeft = 60; // 1 minuto
let randomLetter;

// Función para generar una letra aleatoria
function generateRandomLetter() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const randomIndex = Math.floor(Math.random() * letters.length);
    randomLetter = letters[randomIndex];
    // Mostrar la letra aleatoria
    randomWordContainer.textContent = randomLetter;

    // Habilitar el input
    wordInput.disabled = false;
    // Iniciar el temporizador
    startTimer(); 
}

// Función para temporizador
function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        if (timeLeft <= 0) {
            clearInterval(timer);
            alert("¡Se acabó el tiempo!");
            // Bloquear input
            wordInput.disabled = true; 
        }
    }, 1000);
}

// Función para agregar las palabras
function addWordToList() {
    const word = wordInput.value.trim();
    // Codición para que escriba con la misma letra que aparezca
    if (word && word[0].toUpperCase() === randomLetter) {
        const row = document.createElement("tr");
        const rowNew = document.createElement("td")
        
        rowNew.textContent = word;

        row.appendChild(rowNew)
        wordList.appendChild(row);
        // vaciar el input
        wordInput.value = "";
    } else if (word) {
        alert(`La palabra debe comenzar con la letra "${randomLetter}".`);
        // Limpiar el input
        wordInput.value = ""; 
    }
}

// Evento para agregar la palabra al presionar Enter
wordInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        addWordToList();
    }
});

// Generar una letra aleatoria al cargar la página
window.onload = generateRandomLetter();