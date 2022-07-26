let opciones = ["piedra", "papel", "tijera"];

function juego(elemento) {
    let maquina = opciones[Math.floor(Math.random() * 3)];
    console.log(`Elegiste : ${elemento} y la maquina eligio: ${maquina}`);

    if (maquina === "piedra" && elemento === "tijera") { console.log('Perdiste!'); }
    else if (maquina === "piedra" && elemento === "papel") { console.log('GANASTE!'); }
    else if (maquina === "papel" && elemento === "tijera") { console.log('GANASTE!'); }
    else if (maquina === "papel" && elemento === "piedra") { console.log('Perdiste!!'); }
    else if (maquina === "tijera" && elemento === "piedra") { console.log('GANASTE'); }
    else if (maquina === "tijera" && elemento === "papel") { console.log('perdiste'); }
    else {
        console.log("EMPATE!!!");
    }
}

//Usuario ingresa Opcion entre "piedra", "papel" o "tijera":
juego("papel"); //La respuesta dependera de el random que elija la maquina

function juegoConSwitch(elemento) {
    let maquina = opciones[Math.floor(Math.random() * 3)];
    console.log(`Elegiste : ${elemento} y la maquina eligio: ${maquina}`);

    switch (elemento) {
        case 'piedra':
            if (maquina === 'papel') {
                console.log('Perdiste');

            } else if (maquina === 'tijera') {
                console.log('GANASTE!');
            } else { console.log('EMPATE'); }
            break;
         case 'papel':
            if (maquina === 'tijera') {
                console.log('Perdiste');

            } else if (maquina === 'piedra') {
                console.log('GANASTE!');
            } else { console.log('EMPATE'); }
            break;
         case 'tijera':
            if (maquina === 'piedra') {
                console.log('Perdiste');

            } else if (maquina === 'papel') {
                console.log('GANASTE!');
            } else { console.log('EMPATE'); }
            break;
    }


}