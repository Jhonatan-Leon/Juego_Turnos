const btnReset = document.getElementById('btn-reset');

function loadResults() {
    const numPlayers = localStorage.getItem('numPlayers');
    
    if (!numPlayers) {
        console.error("No hay jugadores en localStorage");
        const resultsTableBody = document.getElementById('resultsTable').querySelector('tbody');
        resultsTableBody.innerHTML = '<tr><td colspan="3">No hay resultados disponibles.</td></tr>';
        return;
    }

    const resultsTableBody = document.getElementById('resultsTable').querySelector('tbody');
    resultsTableBody.textContent = ''; // Limpiar tabla antes de insertar datos

    let maxWords = 0;
    let winnerIndex = -1;

    for (let i = 0; i < numPlayers; i++) {
        const playerName = localStorage.getItem(`playerName${i}`);
        const playerWords = JSON.parse(localStorage.getItem(`playerWords${i}`)) || []; // Asegúrate de analizar como JSON
        const totalWords = playerWords.length;

        if (!playerName) {
            console.warn(`Jugador ${i} no tiene nombre guardado.`);
            continue;
        }

        const row = document.createElement('tr');

        const nameCell = document.createElement('td');
        nameCell.textContent = playerName;

        const wordsCell = document.createElement('td');
        wordsCell.classList.add('result');

        // Mensaje si no hay palabras
        wordsCell.textContent = totalWords > 0 ? playerWords.join(', ') : 'Sin palabras'; 

        const totalWordsCell = document.createElement('td');
        totalWordsCell.textContent = totalWords;

        row.appendChild(nameCell);
        row.appendChild(wordsCell);
        row.appendChild(totalWordsCell);
        
        resultsTableBody.appendChild(row);

        if (totalWords > maxWords) {
            maxWords = totalWords;
            winnerIndex = i;
        }
    }

    if (winnerIndex !== -1) {
        resultsTableBody.rows[winnerIndex].classList.add('winner');
    }
}

// Asegurar que se ejecute solo cuando el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", loadResults);

btnReset.addEventListener('click', () => {
    localStorage.clear();
    window.location.href = "../index.html";
});