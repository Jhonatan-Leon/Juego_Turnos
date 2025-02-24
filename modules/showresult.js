document.addEventListener("DOMContentLoaded", () => {
    setTimeout(loadResults, 100); // Da tiempo para que se complete la carga del DOM
});

const btnReset = document.getElementById('btn-reset');

function loadResults() {
    // Convertir a número
    const numPlayers = parseInt(localStorage.getItem('numPlayers'), 10); 

    if (!numPlayers || isNaN(numPlayers)) {
        console.error("No hay jugadores en localStorage o el número de jugadores no es válido.");
        const resultsTableBody = document.getElementById('resultsTable').querySelector('tbody');
        resultsTableBody.innerHTML = '<tr><td colspan="3">No hay resultados disponibles.</td></tr>';
        return;
    }

    const resultsTableBody = document.getElementById('resultsTable').querySelector('tbody');
     // Limpiar tabla antes de insertar datos
    resultsTableBody.textContent = '';

    let maxWords = 0;
    let winnerIndex = -1;

    for (let i = 0; i < numPlayers; i++) {
        const playerName = localStorage.getItem(`playerName${i}`) || `Jugador ${i + 1}`;
        // Asegurar JSON válido
        const playerWords = JSON.parse(localStorage.getItem(`playerWords${i}`) || "[]"); 
        const totalWords = playerWords.length;

        // Crear fila para cada jugador
        const row = document.createElement('tr');

        const nameCell = document.createElement('td');
        nameCell.textContent = playerName;

        const wordsCell = document.createElement('td');
        wordsCell.classList.add('result');
        wordsCell.textContent = totalWords > 0 ? playerWords.join(', ') : 'Sin palabras';

        const totalWordsCell = document.createElement('td');
        totalWordsCell.textContent = totalWords;

        row.appendChild(nameCell);
        row.appendChild(wordsCell);
        row.appendChild(totalWordsCell);
        
        resultsTableBody.appendChild(row);

        // Determinar ganador
        if (totalWords > maxWords) {
            maxWords = totalWords;
            winnerIndex = resultsTableBody.rows.length - 1;
        }
    }

    if (winnerIndex !== -1) {
        resultsTableBody.rows[winnerIndex].classList.add('winner');
    }
}

// Botón para reiniciar el juego
btnReset.addEventListener('click', () => {
    localStorage.clear();
    window.location.href = "../index.html";
});
