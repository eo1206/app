import { db } from "./firebase.js";

import {

collection,
onSnapshot,
doc,
updateDoc,
getDocs,
setDoc,
deleteDoc

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

const limpiar=
document.getElementById(
"limpiar"
);


const admin=

localStorage.getItem(
"admin"
)==="true";


if(!admin){

iniciar.style.display="none";
limpiar.style.display="none";

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

const jugador={

id:docu.id,
...docu.data()

};

jugadores.push(
jugador
);


html+=`

<div>

${jugador.nombre}

${
admin

?

`<button
onclick="eliminarJugador('${docu.id}')">

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


if(
jugadores.length>=4
){

crearEquipos();

}


}

);



async function crearEquipos(){


if(
jugadores[0].equipo
)return;



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



equipos.innerHTML=`

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



window.eliminarJugador=

async(id)=>{


if(!admin)return;


if(
confirm(
"Eliminar jugador?"
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
"Reiniciar clase?"
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
"partida",
"estado"
),

{

iniciado:false

}

);


alert(
"Clase reiniciada"

);


}

);



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

iniciado:true,

turnoJugador:
jugadores[0].id,

preguntaActual:0

}

);


}

);



onSnapshot(

doc(
db,
"partida",
"estado"
),

(docu)=>{


if(
!docu.exists()
)return;


const juego=
docu.data();


if(
juego.iniciado
){

window.location.href=
"juego.html";

}


}

);