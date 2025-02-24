let numPlayers = null; 
let playerNames = [];

const btn_create = document.getElementById('CreateNames');
const btn_startGame = document.getElementById('startGame');
const inputName = document.getElementById('inputNames'); 

// Función para establecer el número de jugadores
export function setNumPlayers() {
    numPlayers = localStorage.getItem('numPlayers');
    document.getElementById('namesTable').querySelector('tbody').innerHTML = ''; 
    playerNames = []; 
}

// Función para crear la tabla de nombres
function createTable(tope, names) {
    if (names && playerNames.length < tope) {
        playerNames.push(names);
        localStorage.setItem(`playerName${playerNames.length - 1}`, names); 

        // Crear una nueva fila en la tabla
        const row = document.createElement('tr');
        const nameCell = document.createElement('td');
        nameCell.textContent = names;
        row.appendChild(nameCell);
        document.getElementById('namesTable').querySelector('tbody').appendChild(row);

        inputName.value = "";

    } else if (playerNames.length >= tope) {
        alert(`Ya se han ingresado ${tope} jugadores.`);
    } else {
        alert("Por favor, ingrese un nombre válido.");
    }
}

// Cargar los nombres de los jugadores al iniciar
setNumPlayers();

// Evento para agregar nombres con botón
btn_create.addEventListener("click", () => {
    const name = inputName.value.trim();
    createTable(numPlayers, name);
});

inputName.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        const name = inputName.value.trim();
        createTable(numPlayers, name);
    }
});

// Evento para iniciar el juego
btn_startGame.addEventListener('click', () => {
    if (playerNames.length === 0) {
        alert("Por favor, ingrese al menos un nombre de jugador.");
        return;
    }

    if (playerNames.length < numPlayers) {
        alert(`Por favor, complete los nombres de todos los ${numPlayers} jugadores.`);
        return;
    }

    localStorage.setItem('numPlayers', playerNames.length);
    window.location.href = "../templates/juego.html";
});
