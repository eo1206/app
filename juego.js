import { db }
from "./firebase.js";

import { preguntas }
from "./preguntas.js";

import {

doc,
updateDoc,
increment

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
".opcion");


let indiceActual=0;
let respondio=false;



cargarPregunta();



function cargarPregunta(){

respondio=false;

let preguntaActual=
preguntas[indiceActual];


preguntaHTML.innerHTML=
preguntaActual.pregunta;


preguntaActual.opciones.forEach(

(opcion,i)=>{

botones[i].innerHTML=
opcion;

}

);

}



botones.forEach(

(btn,i)=>{

btn.addEventListener(

"click",

async()=>{


if(respondio)return;

respondio=true;


let preguntaActual=
preguntas[indiceActual];


if(
i===preguntaActual.correcta
){

let jugadorID=

localStorage.getItem(
"jugadorID"
);


await updateDoc(

doc(
db,
"jugadores",
jugadorID
),

{

puntos:
increment(10)

}

);


mensaje.innerHTML=
"Correcto +10";

}
else{

mensaje.innerHTML=
"Incorrecto";

}


setTimeout(()=>{


indiceActual++;


if(
indiceActual<
preguntas.length
){

cargarPregunta();

mensaje.innerHTML="";

}
else{

window.location.href=
"ranking.html";

}


},1500);


}

);


}

);