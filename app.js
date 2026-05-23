import {db}
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
guardar
);


async function guardar(){

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

alert(
"Guardado correctamente"
);

}
catch(error){

console.log(error);

alert(
"Error"
);

}

}