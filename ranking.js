import { db }

from "./firebase.js";

import {

collection,
query,
orderBy,
onSnapshot

}

from

"https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";



const q=

query(

collection(
db,
"jugadores"
),

orderBy(
"puntos",
"desc"
)

);



onSnapshot(

q,

(snapshot)=>{


let html="";


snapshot.forEach(

(docu)=>{


let jugador=

docu.data();


html+=`

<p>

${jugador.nombre}

-

${jugador.puntos}

pts

</p>

`;

}


);


document
.getElementById(
"ranking"
)
.innerHTML=
html;


}

);