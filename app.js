import { db }

from "./firebase.js";

import {

collection,
addDoc

}

from

"https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";


let boton =
document.getElementById(
"btnEntrar"
);


boton.addEventListener(
"click",
guardarJugador
);


async function guardarJugador(){

let nombre =

document.getElementById(
"nombre"
).value;


if(nombre===""){

alert(
"Escribe un nombre"
);

return;

}


try{

await addDoc(

collection(
db,
"jugadores"
),

{

nombre:nombre,
puntos:0,
vidas:3

}

);

alert(
"Jugador guardado"
);

}
catch(error){

console.log(error);

alert(
"Error"
);

}

}