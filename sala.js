import { db } from "./firebase.js";

import {

collection,
onSnapshot,
doc,
setDoc,
deleteDoc,
getDocs,
getDoc

}

from

"https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";


const lista=
document.getElementById("lista");

const boton=
document.getElementById("iniciar");

const limpiar=
document.getElementById("limpiar");


const admin=

localStorage.getItem(
"admin"
)==="true";


if(!admin){

boton.style.display="none";

limpiar.style.display="none";

}


const jugadoresRef=
collection(
db,"jugadores");



iniciar();



async function iniciar(){


if(admin){

await setDoc(

doc(
db,
"control",
"estado"
),

{

iniciado:false

},

{

merge:true

}

);

}


cargarJugadores();

escucharJuego();

}



function cargarJugadores(){

onSnapshot(

jugadoresRef,

(snapshot)=>{

let html="";


snapshot.forEach((docu)=>{

let jugador=
docu.data();


html+=`

<div class="jugador">

${jugador.nombre}

${
admin

?

`<button onclick="eliminarJugador('${docu.id}')">

Eliminar

</button>`

:

""

}

</div>

`;

});


lista.innerHTML=
html;

}

);

}



window.eliminarJugador=

async(id)=>{


if(!admin)return;


if(

confirm(
"¿Eliminar jugador?"
)

){

await deleteDoc(

doc(
db,
"jugadores",
id
)

);

}

};



limpiar.addEventListener(

"click",

async()=>{


if(

!confirm(
"¿Reiniciar clase?"
)

)return;


const snapshot=

await getDocs(
jugadoresRef
);


for(const docu of snapshot.docs){

await deleteDoc(

doc(
db,
"jugadores",
docu.id
)

);

}


await setDoc(

doc(
db,
"control",
"estado"
),

{

iniciado:false

}

);


alert(
"Clase reiniciada");

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



function escucharJuego(){


onSnapshot(

doc(
db,
"control",
"estado"
),

(docu)=>{


if(
!docu.exists()
)return;


const estado=
docu.data();


if(
estado.iniciado===true
){

window.location.href=
"juego.html";

}


}

);


}