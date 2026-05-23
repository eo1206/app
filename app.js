import { db }
from "./firebase.js";

import {
collection,
addDoc
}
from
"https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

let boton=
document.getElementById(
"btnEntrar"
);

boton.addEventListener(
"click",
registrarJugador
);

async function registrarJugador(){

let nombre=
document.getElementById(
"nombre"
).value;

if(nombre===""){

alert("Escribe un nombre");
return;

}

try{

const docRef=

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

localStorage.setItem(
"jugadorID",
docRef.id
);

localStorage.setItem(
"nombre",
nombre
);

window.location.href=
"sala.html";

}
catch(error){

console.log(error);

}

}