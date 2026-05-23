import { db } from "./firebase.js";

import {
collection,
addDoc
}

from
"https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";


document
.getElementById("btnEntrar")
.addEventListener(
"click",
registrarJugador
);


async function registrarJugador(){

let nombre=
document
.getElementById("nombre")
.value
.trim();


if(nombre===""){

alert("Escribe un nombre");
return;

}


const esAdmin=
nombre.toLowerCase()==="admin";


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
vidas:3,
admin:esAdmin

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

localStorage.setItem(
"admin",
esAdmin
);


window.location.href=
"sala.html";

}

catch(error){

console.log(error);

}

}