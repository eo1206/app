import { db } from "./firebase.js";

import {
collection,
onSnapshot
}

from

"https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";



// Mostrar nombre del jugador actual

const nombreJugador =

localStorage.getItem(
"nombre"
);

document.getElementById(
"jugador"
).textContent=

"Jugador: " + nombreJugador;



// Referencia a colección

const jugadoresRef =

collection(
db,
"jugadores"
);



// Escuchar cambios en tiempo real

onSnapshot(

jugadoresRef,

(snapshot)=>{

let html="";

snapshot.forEach((doc)=>{

const jugador=
doc.data();

html += `

<div class="jugador">

${jugador.nombre}

</div>

`;

});

document.getElementById(
"lista"
).innerHTML=
html;

}

);



// Botón iniciar

document
.getElementById(
"iniciar"
)
.addEventListener(
"click",
()=>{

window.location.href=
"juego.html";

}
);