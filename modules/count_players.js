
let SelectValue = null;
    const btn_continue = document.getElementById('btn-continue'); 
    const SelectPlayers = document.querySelectorAll(".container-players");


    //Obtener número de jugadores seleccionado
    export function get_Players(){ 
        SelectPlayers.forEach(element =>  {
            element.addEventListener("click", () => {
                // Removemos la clase que se seleciona
                SelectPlayers.forEach(element => element.classList.remove('Select'));   

                // Guardamos el valor de el article seleccionado
                SelectValue = element.getAttribute('value');
                console.log(SelectValue);
            })
        });    
};  


// Condición para tope de jugadores
function topePlayers(value){
    if (value === 1) {
        alert("El mínimo de jugadores son: 2 y máximo 4");
        console.log(value);
        SelectValue = null;
        return get_Players();
    } else if (value === 2 || value === 3 || value === 4) {
        return setNumPlayers(value)
    } else {
        alert("Por favor, seleccione una opción");
    }
}

btn_continue.addEventListener("click", () => {
    topePlayers(Number(SelectValue));
});


get_Players();


