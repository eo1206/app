import { db }

from "./firebase.js";


import {

doc,
updateDoc,
increment

}

from

"https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";



const preguntas=[

{

pregunta:

"Pedro recibe buen salario pero siente falta de reconocimiento ¿Qué teoría aplica?",

opciones:[

"Maslow",
"Herzberg",
"McClelland",
"Equidad"

],

correcta:1

}

];



let preguntaActual=
preguntas[0];


let respondio=
false;



document
.getElementById(
"pregunta"
)
.innerHTML=

preguntaActual.pregunta;



const botones=

document.querySelectorAll(
".opcion"
);



preguntaActual.opciones
.forEach(

(opcion,i)=>{

botones[i]
.innerHTML=
opcion;

}

);



botones.forEach(

(btn,i)=>{


btn.addEventListener(

"click",

async()=>{


if(
respondio
)return;


respondio=
true;



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


document
.getElementById(
"mensaje"
)
.innerHTML=

"Correcto +10";

}

else{


document
.getElementById(
"mensaje"
)
.innerHTML=

"Incorrecto";

}


}


);


}

);