import { db } from "./firebase.js";

import { preguntas }
from "./preguntas.js";

import {

doc,
getDocs,
collection,
setDoc,
updateDoc,
increment,
onSnapshot

}

from

"https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";


const preguntaHTML=
document.getElementById(
"pregunta"
);

const mensaje=
document.getElementById(
"mensaje"
);

const botones=
document.querySelectorAll(
".opcion"
);

const tiempoHTML=
document.getElementById(
"tiempo"
);



const jugadorID=
localStorage.getItem(
"jugadorID"
);


let preguntaActual;


inicializarJuego();



async function inicializarJuego(){


const jugadores=

await getDocs(

collection(
db,
"jugadores"
)

);


const lista=[];

jugadores.forEach(
docu=>{

lista.push({

id:docu.id,
...docu.data()

});

});


if(lista.length>=4){

await asignarEquipos(
lista
);

}


escucharEstado();


}



async function asignarEquipos(lista){


await updateDoc(

doc(
db,
"jugadores",
lista[0].id
),

{

equipo:"A"

}

);


await updateDoc(

doc(
db,
"jugadores",
lista[1].id
),

{

equipo:"A"

}

);


await updateDoc(

doc(
db,
"jugadores",
lista[2].id
),

{

equipo:"B"

}

);


await updateDoc(

doc(
db,
"jugadores",
lista[3].id
),

{

equipo:"B"

}

);


await setDoc(

doc(
db,
"partida",
"estado"
),

{

turno:"A",
preguntaActual:0,
tiempo:20

}

);


}



function escucharEstado(){


onSnapshot(

doc(
db,
"partida",
"estado"
),

async(docu)=>{


let juego=
docu.data();


tiempoHTML.innerHTML=

juego.tiempo;


preguntaActual=

preguntas[
juego.preguntaActual
];


preguntaHTML.innerHTML=

preguntaActual.pregunta;


preguntaActual.opciones.forEach(

(opcion,i)=>{

botones[i].innerHTML=
opcion;

}

);


}

);


}



botones.forEach(

(btn,i)=>{


btn.addEventListener(

"click",

async()=>{


const estadoDoc=

doc(
db,
"partida",
"estado"
);


let turnoActual=
"A";


let jugadorDoc=

await getDocs(

collection(
db,
"jugadores"
)

);


let miEquipo;


jugadorDoc.forEach(
j=>{

if(
j.id===jugadorID
){

miEquipo=
j.data().equipo;

}

});


if(
miEquipo!==turnoActual
){

mensaje.innerHTML=

"No es tu turno";

return;

}



if(
i===preguntaActual.correcta
){

await updateDoc(

doc(
db,
"equipos",
miEquipo
),

{

puntos:
increment(10)

}

);


mensaje.innerHTML=
"+10";

}


await updateDoc(

estadoDoc,

{

turno:
miEquipo==="A"
?
"B"
:
"A",

preguntaActual:
increment(1)

}

);


}

);


});