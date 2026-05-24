import { db }
from "./firebase.js";

import { preguntas }
from "./preguntas.js";

import {

doc,
getDoc,
getDocs,
collection,
onSnapshot,
updateDoc,
increment

}

from

"https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";


const jugadorID=

localStorage.getItem(
"jugadorID"
);


const turnoHTML=
document.getElementById(
"turno"
);

const equipoHTML=
document.getElementById(
"equipo"
);

const companeroHTML=
document.getElementById(
"companero"
);

const preguntaHTML=
document.getElementById(
"pregunta"
);

const botones=
document.querySelectorAll(
".opcion"
);


let jugadores=[];


cargar();



async function cargar(){


const snapshot=

await getDocs(

collection(
db,
"jugadores"

)

);


snapshot.forEach(
d=>{

jugadores.push({

id:d.id,
...d.data()

});

});


const yo=

jugadores.find(
j=>j.id===jugadorID
);


equipoHTML.innerHTML=

`Equipo ${yo.equipo}`;


const companero=

jugadores.find(

j=>

j.equipo===yo.equipo
&&
j.id!==yo.id

);


companeroHTML.innerHTML=

`Tu compañero:
${companero.nombre}`;


escucharPartida();

}



function escucharPartida(){


onSnapshot(

doc(
db,
"partida",
"estado"
),

async(docu)=>{


const juego=
docu.data();


const turnoJugador=

jugadores.find(

j=>

j.id===juego.turnoJugador

);


turnoHTML.innerHTML=

`Turno:
${turnoJugador.nombre}`;


let pregunta=

preguntas[
juego.preguntaActual
];


preguntaHTML.innerHTML=
pregunta.pregunta;


pregunta.opciones.forEach(

(op,i)=>{

botones[i].innerHTML=
op;

});


botones.forEach(

btn=>{

btn.disabled=

turnoJugador.id
!==jugadorID;

});



}

);



}