import { db } from "./firebase.js";

import {

collection,
onSnapshot,
doc,
updateDoc,
getDocs,
setDoc

}

from

"https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";


const lista=
document.getElementById(
"lista"
);

const equipos=
document.getElementById(
"equipos"
);

const iniciar=
document.getElementById(
"iniciar"
);


const admin=

localStorage.getItem(
"admin"
)==="true";


if(!admin){

iniciar.style.display=
"none";

}


const jugadoresRef=
collection(
db,
"jugadores"
);


let jugadores=[];


onSnapshot(

jugadoresRef,

(snapshot)=>{

jugadores=[];

let html="";


snapshot.forEach((docu)=>{

let jugador={

id:docu.id,
...docu.data()

};

jugadores.push(
jugador
);

html+=`

<div>

${jugador.nombre}

</div>

`;

});


lista.innerHTML=
html;


if(
jugadores.length===4
){

crearEquipos();

}


}

);



async function crearEquipos(){


await updateDoc(

doc(
db,
"jugadores",
jugadores[0].id
),

{

equipo:"A"

}

);


await updateDoc(

doc(
db,
"jugadores",
jugadores[1].id
),

{

equipo:"A"

}

);


await updateDoc(

doc(
db,
"jugadores",
jugadores[2].id
),

{

equipo:"B"

}

);


await updateDoc(

doc(
db,
"jugadores",
jugadores[3].id
),

{

equipo:"B"

}

);


equipos.innerHTML=

`
Equipo A:
${jugadores[0].nombre}
+
${jugadores[1].nombre}

<br><br>

Equipo B:
${jugadores[2].nombre}
+
${jugadores[3].nombre}
`;

}



iniciar.addEventListener(

"click",

async()=>{


await setDoc(

doc(
db,
"partida",
"estado"
),

{

turnoJugador:
jugadores[0].id,

indiceTurno:0,

preguntaActual:0,

iniciado:true

}

);


window.location.href=
"juego.html";


}

);