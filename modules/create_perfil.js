let numPlayers = null; 
let playerNames = [];

const btn_create = document.getElementById('CreateNames');
const btn_startGame = document.getElementById('startGame');

// Función para establecer el número de jugadores
export function setNumPlayers() {
    // Recuperar el número de jugadores desde localStorage
    numPlayers = localStorage.getItem('numPlayers');
    document.getElementById('namesTable').querySelector('tbody').innerHTML = ''; // Limpiar la tabla
    playerNames = []; // Reiniciar la lista de nombres
}

// Función para crear la tabla de nombres
function createTable(tope, names) {
    if (names && playerNames.length < tope) {
        // Agregar el nombre a la lista
        playerNames.push(names); 
        localStorage.setItem(`playerName${playerNames.length - 1}`, names); // Almacenar en localStorage

        // Crear una nueva fila en la tabla
        const row = document.createElement('tr');
        const nameCell = document.createElement('td');

        nameCell.textContent = names;
        
        row.appendChild(nameCell);
        document.getElementById('namesTable').querySelector('tbody').appendChild(row); 

    } else if (playerNames.length >= tope) {
        alert(`Ya se han ingresado ${tope} jugadores.`);
    } else {
        alert("Por favor, ingrese un nombre válido.");
    }
}

// Cargar los nombres de los jugadores al iniciar
setNumPlayers();

btn_create.addEventListener("click", () => {
    // Obtenemos los nombres del input
    const inputName = document.getElementById('inputNames').value.trim();
    createTable(numPlayers, inputName); 
});

btn_startGame.addEventListener('click', () => {
    // Validar que el input no esté vacío y que se haya alcanzado el número máximo de jugadores
    if (playerNames.length === 0) {
        alert("Por favor, ingrese al menos un nombre de jugador.");
        return;
    }

    if (playerNames.length < numPlayers) {
        alert(`Por favor, complete los nombres de todos los ${numPlayers} jugadores.`);
        return;
    }

    // Guardar el número de jugadores en localStorage
    localStorage.setItem('numPlayers', playerNames.length);
    
    // Redirigir a la página del juego
    window.location.href = "../templates/juego.html";
});