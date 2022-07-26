// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.4/firebase-app.js";
import { getFirestore, collection, addDoc,getDocs,doc,getDoc,query, where,onSnapshot } from "https://www.gstatic.com/firebasejs/9.6.4/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCrTAa8iZfEw0ywxY2qKxmA9aKXqA9OEPU",
  authDomain: "plataformaiot-826bf.firebaseapp.com",
  projectId: "plataformaiot-826bf",
  storageBucket: "plataformaiot-826bf.appspot.com",
  messagingSenderId: "832254013614",
  appId: "1:832254013614:web:50abb9f7393734ee34bd3f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

//--------------Envio de información ---------------------------------------

async function createNewDevice(type,value,name){
try {
  const docRef = await addDoc(collection(db, "devices"), {
      type: type,
      name: name,
      value:value
      
  });
  console.log("Device ID:", docRef.id);
} catch (e) {
  console.error("Error adding document: ", e);
}

}

async function createNewUser(user,name,password){
    try {
        const docRef = await addDoc(collection(db, "users"), {
            user: user,
            name: name,
            password: password,
            devices: []
        });
        
    } catch {
        
    }
}
// // //Creacion de 5 dispositivos
// for (let i = 0; i < 3; i++){
//     createNewDevice('temp', 0, "Temperatura");
//     createNewDevice('On-Off', true, "Sala");
// }

//Crear nuevo usuario
 //createNewUser("isa2981", "Isaen Olvera De la fuente", "quesadilla17");
//--------------Leer información ---------------------------------------

//-------------Obtener toda una coleccion----------------------------------------------------------------
// const querySnapshot = await getDocs(collection(db, "users"));
// querySnapshot.forEach((doc) => {
//     console.log(`${doc.id} ===> { ${doc.data().name} , ${doc.data().user}, ${doc.data().password}`);
//     doc.data().devices.forEach((device) => {
//         console.log(device);
//     });
// });

//-------------Obtener un dato en especifico--------------------------
// const docRef = doc(db, "users", "LXOxBNlLeAB1xw3jvigw");
// const docSnap = await getDoc(docRef);

// if (docSnap.exists()) {
//     console.log(docSnap.data());
    
// } else {
//     console.log('Usurario no encontrado');
// }
//-----------Obtener datos mediante query-------------------------------
// const q = query(collection(db, "devices"), where("type", "==", "Tem-Hum"));
// const snapShot = await getDocs(q);
// if (snapShot) {
//    snapShot.forEach(element => {
//         console.log(`${element.id} => `);
//        console.log(element.data());
//     });
// } else {
//     console.log('No existe');
// }

//----------Detectar actualizaciones en tiempo real-----------------
const unsub = onSnapshot(collection(db, "devices"), (snapshot) => {
    snapshot.docChanges().forEach(change => {
        if (change.type === "modified") {
            console.log("ID cambio : ", change.doc.id);
            console.log("cambio detectado: ", change.doc.data());
            actualizar(change.doc.id,change.doc.data().value,change.doc.data().name,change.doc.data().type)
        }
        // if (change.type === "added") {
        //      console.log("ID agregado : ", change.doc.id);
        //     console.log("Datos agregados: ", change.doc.data());
        // }
        //  if (change.type === "remove") {
        //      console.log("ID eliminado : ", change.doc.id);
        //     console.log("Datos eliminados: ", change.doc.data());
        // }
    });
    
});

function actualizar(id, value,name,type) {
    
    let elemento = document.getElementById(id);
    console.log(elemento);
    if (type === 'temp') {
        elemento.innerHTML = `<span>${name} </span>
                <h2 >${value} °C</h2>`;
    }
    if (type === 'hum') {
        elemento.innerHTML = `<span>${name} </span>
                <h2 >${value} %</h2>`;
    }    
}