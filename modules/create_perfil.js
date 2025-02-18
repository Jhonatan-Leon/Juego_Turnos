let numPlayers = 2; 
let playerNames = [];

const btn_create = document.getElementById('CreateNames');

// Función para establecer el número de jugadores
export function setNumPlayers(count) {
    document.getElementById('namesTable').textContent = ''; // Vaciar tabla
    
    numPlayers = count;
    playerNames = []; // reiniciamos lista de nombres
    
}

btn_create.addEventListener('click', () => {
        
    // Obtenemos los nombres del input
    const inputName = document.getElementById('inputNames').value.trim();

    // Mostrar lista con nombres y posición
    createTable(numPlayers, inputName); 
}) 


function createTable(tope, names){
    // Verificar si el nombre no está vacío y si no se ha alcanzado el número máximo de jugadores
    if (names && playerNames.length < tope) {
        // Agregar el nombre a la lista
        playerNames.push(names); 

        // Crear una nueva fila en la tabla
        const row = document.createElement('tr');
        const positionCell = document.createElement('td');
        const nameCell = document.createElement('td');

        // Nombre
        nameCell.textContent = names;
        // Puesto
        positionCell.textContent = playerNames.length; 
        

        row.appendChild(positionCell);
        row.appendChild(nameCell);
        document.getElementById('namesTable').appendChild(row); // Agregar la fila a la tabla

    } else if (playerNames.length >= tope) {
        alert(`Ya se han ingresado ${tope} jugadores.`);
    } else {
        alert("Por favor, ingrese un nombre válido.");
    }
};
