import { db } from "./firebase.js";

import {

collection,
onSnapshot,
doc,
setDoc

}

from

"https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";



const lista=

document.getElementById(
"lista"
);

const boton=

document.getElementById(
"iniciar"
);


const admin=

localStorage.getItem(
"admin"
)==="true";



if(!admin){

boton.style.display=
"none";

}


const jugadoresRef=

collection(
db,
"jugadores"
);


onSnapshot(

jugadoresRef,

(snapshot)=>{

let html="";

snapshot.forEach((docu)=>{

html+=`

<div class="jugador">

${docu.data().nombre}

</div>

`;

});

lista.innerHTML=
html;

}

);



boton.addEventListener(

"click",

async()=>{

await setDoc(

doc(
db,
"control",
"estado"
),

{

iniciado:true

}

);

}

);



onSnapshot(

doc(
db,
"control",
"estado"
),

(docu)=>{

if(
docu.exists()
){

if(
docu.data().iniciado
){

window.location.href=
"juego.html";

}

}

}

);