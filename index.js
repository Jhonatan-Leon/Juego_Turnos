const btnContinue = document.getElementById('btn-continue');
const optionplayers = document.querySelectorAll('.container-players');

let selectedPlayers = null;

export function countplayers() {
    optionplayers.forEach(option => {
        option.addEventListener('click', () => {
            optionplayers.forEach(opt => opt.classList.remove('selected'));
        
            // Agregar la clase 'selected' a la opción seleccionada
            option.classList.add('selected');

            selectedPlayers = option.getAttribute('value');
            console.log(`Número de jugadores seleccionados: ${selectedPlayers}`);
        });
    });
}

btnContinue.addEventListener('click', (event) => {
    if (selectedPlayers) {
        // Almacenar el número de jugadores en localStorage
        localStorage.setItem('numPlayers', selectedPlayers);
    } else {
        event.preventDefault();
        alert("Por favor, selecciona el número de jugadores.");
    }
});

countplayers();