import {db}
from "./firebase.js";

import {
collection,
addDoc
}
from
"https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";


console.log("Página cargó");

let boton=
document.getElementById("btnEntrar");

console.log(boton);

boton.addEventListener(
"click",
guardar
);

async function guardar(){

console.log("Entró al botón");

try{

await addDoc(

collection(
db,
"jugadores"
),

{

nombre:
document.getElementById(
"nombre"
).value,

puntos:0,
vidas:3

}

);

console.log("Guardado");

alert("Guardado");

}
catch(error){

console.log(
"ERROR:"
);

console.log(error);

}
}