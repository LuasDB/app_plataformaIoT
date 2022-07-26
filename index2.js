//++++++++ FIREBASE +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// importamos las funciones que se utilzaran para Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.4/firebase-app.js";
import { getFirestore, collection, addDoc,getDocs,doc,getDoc,query, where,onSnapshot,setDoc,updateDoc, arrayUnion, arrayRemove  } from "https://www.gstatic.com/firebasejs/9.6.4/firebase-firestore.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.6.4/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword,signOut } from "https://www.gstatic.com/firebasejs/9.6.4/firebase-auth.js";

const userId = "LXOxBNlLeAB1xw3jvigw";

// Configuracion de la app web de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCrTAa8iZfEw0ywxY2qKxmA9aKXqA9OEPU",
  authDomain: "plataformaiot-826bf.firebaseapp.com",
  projectId: "plataformaiot-826bf",
  storageBucket: "plataformaiot-826bf.appspot.com",
  messagingSenderId: "832254013614",
  appId: "1:832254013614:web:50abb9f7393734ee34bd3f"
};

// Inicializacion  Firebase y base de datos de Firestore
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth();
const email = "brenda2s@correo.com";
const password = "quesadilla16";
const name = "Brenda Lopez";
const imageUrl = "www.ssiwdnw.com";

//--------------Envio de información ---------------------------------------
function writeUserData(userId, name, email, imageUrl) {
  const db = getDatabase();
  set(ref(db, 'users/' + userId), {
    username: name,
    email: email,
    profile_picture : imageUrl
  });
}

signOut(auth).then(() => {
  // Sign-out successful.
}).catch((error) => {
  // An error happened.
});


// createUserWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
      
//       const user = userCredential.user;
//       console.log('Usuario creado con ID:' + user.uid);
//       writeUserData(user.uid, name, email, imageUrl)


//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // ..
//   });





//----------Detectar actualizaciones en tiempo real-----------------



//---------------------------------------------------------------------------------------------------------------------------------------------
//Elementos del DOM
let menu = document.querySelector('#nav_menu');
let sections = document.querySelector('main');
// let dashboard = document.querySelector('.dashboard-devices');
// let devices = document.querySelector('.list-of-devices');
listeners();
 
// callDashboard();

//Buttons
let btn_newDevice = document.querySelector('#new_device');
//Inicio 

//Funciones 
function listeners() {

        //listeners
    menu.addEventListener('click', (e) => {
        console.log(e.target.id);
        let opcion = e.target.id;

        switch (opcion) {
            case 'dashboard':
                console.log('Se selecciono el dashboard');
                callDashboard();
                document.querySelector('.dashboard-devices').animate([
                    // keyframes
                    { transform: 'translateX(300px)' },
                    { transform: 'translateX(0px)' },
                    ], {
                        // timing options
                        duration: 600,
                        iterations: 1
                    });
                break;
            case 'devices':
                console.log('Se seleccion de dispositivos');
                callDevices();
                document.querySelector('.list-of-devices').animate([
                    // keyframes
                    { transform: 'translateY(300px)' },
                    { transform: 'translateY(0px)' },
                    ], {
                        // timing options
                        duration: 600,
                        iterations: 1
                    });
                break;
            case 'notifications':
                console.log('Se seleccion de notificaciones');
                break;
            case 'settings':
                console.log('Se seleccion ajustes ');
                break;
            
        }
    });
    sections.addEventListener('click', (e) => {
        // console.log(e.target);
        let option_action = e.target.id;
        let option_edit = e.target.classList[0];
        console.log(option_action);

        switch (option_action) {
            case 'btn_newDevice':
                
                callNewDevice();
                document.querySelector('.form-new-device').animate([
                    // keyframes
                    { transform: 'translateX(300px)' },
                    { transform: 'translateX(0px)' },
                    ], {
                        // timing options
                        duration: 600,
                        iterations: 1
                    });
                

                break;
            case 'btn_search':
                callSearchDevice();
                break;
            case 'btn_send':
                sendNewDevice();
                break;
            default:
                

                break;
        }
        if (option_edit === 'edit-device') {
            console.log(e.target.id);
        }
            
        
    });

    
    


}
function actionListDevices() {
    console.log('Action Devices');
}

async function cardsDashboard() {
   
        const docRef = doc(db, "users", userId);
        const dataUser = await getDoc(docRef);
    let devicesHtml = '';

    if (dataUser.exists()) {
         
        dataUser.data().devices.forEach(async(device) => {
            
            
            let idDev = device.split(' ').join('');
            const docRef2 = doc(db, "devices", idDev);
            const docSnap = await getDoc(docRef2);

            if (docSnap.exists()) {
            
                devicesHtml += `
                <div class="card">
                    <div class="icon">
                        <i class="fas fa-temperature-high"></i>
                    </div>
                    <div class="value-sensor" id=${idDev}">
                        <span>Temperatura</span>
                        <h2 >${docSnap.value} °C</h2>
                    </div>
                    <div class="button-sensor">

                    </div>
                </div>
                `;
                

                
            } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            }
            
            
        });

       setInterval(() => {
           console.log('esperar');
       }, 1000);
       
    } else {
    console.log('Usurario no encontrado');
    }

        

     
     
    
} 
async function callDashboard() {
    sections.innerHTML = '';
    
    let equipos = document.createElement('div');
    let sectionHtml = document.createElement('section');

    sectionHtml.classList.add('dashboard-devices');
    sectionHtml.setAttribute('id', 'dashboard-section');
    let titulo = document.createElement('h2');
    titulo.classList.add('tittle-section');
    titulo.innerHTML = 'Mis sensores';
    sectionHtml.appendChild(titulo);
    sections.appendChild(sectionHtml);

    const docRef = doc(db, "users", userId);
    const dataUser = await getDoc(docRef);
    console.log(dataUser.data());
    dataUser.data().devices.forEach(async (device) => {
        
        //Construccion de una nueva card
        let newCard = document.createElement('div');
            newCard.classList.add('card');
        let newIcon = document.createElement('div');
            newIcon.classList.add('icon');
       
        let sensor = document.createElement('div');
        sensor.classList.add('value-sensor');
        sensor.setAttribute('id', device);
            
        const docRefDevice = doc(db, "devices", device);
        const dataDevice = await getDoc(docRefDevice);
        
        newIcon.innerHTML=`<i class="${dataDevice.data().icono}"></i>`
            
        let spanName = document.createElement('span');
        spanName.innerHTML = dataDevice.data().name;
    
        let h2Value = document.createElement('h2');
            if (dataDevice.data().type === 'temp') {
            h2Value.innerHTML =dataDevice.data().value + ' °C';  
            }
            if (dataDevice.data().type === 'hum') {
                h2Value.innerHTML =dataDevice.data().value + ' %'; 
            }


        
        sensor.appendChild(spanName);
        sensor.appendChild(h2Value);

        newCard.appendChild(newIcon);
        newCard.appendChild(sensor);
        
        sectionHtml.appendChild(newCard);


     });
    
    

   
    
    // sections.innerHTML = `
    // <section class="dashboard-devices " id="dashboard-section">
    //     <h2 class="tittle-section">My sensors</h2>
    //     <div class="card">
    //         <div class="icon">
    //             <i class="fas fa-temperature-high"></i>
    //         </div>
    //         <div class="value-sensor" id="UZkmfIFXoiC8623Rd4Wq">
    //             <span>Temperatura</span>
    //             <h2 >34 °C</h2>
    //         </div>
    //         <div class="button-sensor">

    //         </div>
    //     </div>
    //     <div class="card">
    //         <div class="icon">
    //             <i class="fas fa-cloud"></i>
    //         </div>
    //         <div class="value-sensor" id="jOh7QYS6t4oQV1ehTL7a">
    //             <span>Humedad</span>
    //             <h2>12 %</h2>
    //         </div>
            
            
    //     </div>

    //     <h2 class="tittle-section">Lights</h2>
    //     <div class="card">
    //         <div class="icon">
    //             <i class="fas fa-couch"></i>
    //         </div>
    //         <div class="value-sensor">
    //             <span>Sala</span>
    //             <h2>ON</h2>
    //         </div>
    //         <div class="button-sensor">
    //             <button type="button">Off</button>
    //         </div>
    //     </div>
    //     <div class="card">
    //         <div class="icon">
    //             <i class="fas fa-bath"></i>
    //         </div>
    //         <div class="value-sensor">
    //             <span>Baño</span>
    //             <h2>ON</h2>
    //         </div>
    //         <div class="button-sensor">
    //             <button type="button">Off</button>
    //         </div>
    //     </div>
    //     <h2 class="tittle-section">Graphs</h2>
    //     <canvas id="myChart" width="400" height="400"></canvas>
       

    // </section>`;


    // const ctx = document.getElementById('myChart').getContext('2d');
    // const myChart = new Chart(ctx, {
    //     type: 'line',
    //     data: {
    //         labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    //         datasets: [{
    //             label: '# of Votes',
    //             data: [12, 19, 3, 5, 2, 3],
    //             backgroundColor: [
    //                 'rgba(255, 99, 132, 0.2)',
    //                 'rgba(54, 162, 235, 0.2)',
    //                 'rgba(255, 206, 86, 0.2)',
    //                 'rgba(75, 192, 192, 0.2)',
    //                 'rgba(153, 102, 255, 0.2)',
    //                 'rgba(255, 159, 64, 0.2)'
    //             ],
    //             borderColor: [
    //                 'rgba(255, 99, 132, 1)',
    //                 'rgba(54, 162, 235, 1)',
    //                 'rgba(255, 206, 86, 1)',
    //                 'rgba(75, 192, 192, 1)',
    //                 'rgba(153, 102, 255, 1)',
    //                 'rgba(255, 159, 64, 1)'
    //             ],
    //             borderWidth: 1
    //         }]
    //     },
    //     options: {
    //         scales: {
    //             y: {
    //                 beginAtZero: true
    //             }
    //         }
    //     }
    // });
    
}
async function callDevices() {
    sections.innerHTML = '';

    let sectionHtml = document.createElement('section');
    sectionHtml.classList.add('list-of-devices');
    let titulo = document.createElement('h1');
    titulo.innerHTML = 'Mis dispositivos';
    let boton_new = document.createElement('button');
    boton_new.setAttribute('id','btn_newDevice')
    boton_new.innerHTML = 'New Device';
    sectionHtml.appendChild(titulo);
    sectionHtml.appendChild(boton_new);

    sections.appendChild(sectionHtml);

    const docRefUser = doc(db, "users",userId);
    const dataUser = await getDoc(docRefUser);

    dataUser.data().devices.forEach(async (device) => {
        
        let card = document.createElement('div');
        card.classList.add('edit-device');
        card.classList.add('card-info');
        card.setAttribute('id', device);
        let icon_card = document.createElement('div');
        icon_card.classList.add('icon-card');

        const docRefDevice = doc(db, "devices",device);
        const dataDevice = await getDoc(docRefDevice);
        
        let ul_card = document.createElement('ul');
        ul_card.classList.add('edit-device');
        ul_card.innerHTML= `
            <li class="edit-device" id="${device}">${dataDevice.data().name} </li>
            <li class="edit-device" id="${device}">${dataDevice.data().type} </li>
            <li class="edit-device" id="${device}">${dataDevice.data().value} </li>
        `;
        icon_card.innerHTML = `
        <i class="${dataDevice.data().icono}"></i>
        `;
        card.appendChild(ul_card);
        card.appendChild(icon_card);
        sectionHtml.appendChild(card);
    });
   


    // sections.innerHTML = `<section class="list-of-devices  ">
    //         <H1>Mis dispositivos</H1>
    //         <button class="button" id="btn_newDevice">New device </button>
    //         <table>
    //             <tbody>
    //                 <tr class="header">
    //                     <th>Name</th>
    //                     <th>Type</th>
    //                     <th>Status</th>
    //                     <th>Edit</th>
    //                 </tr>
    //                 <tr>
    //                     <td>Sala</td>
    //                     <td>Sensor</td>
    //                     <td>Activo</td>
    //                     <td><i class="far fa-edit" id="1a"></i></td>
    //                 </tr>
    //                 <tr>
    //                     <td>Sala</td>
    //                     <td>Sensor</td>
    //                     <td>Activo</td>
    //                     <td><i class="far fa-edit" id="2a"></i></td>
    //                 </tr>
    //                 <tr>
    //                     <td>Sala</td>
    //                     <td>Sensor</td>
    //                     <td>Activo</td>
    //                     <td><i class="far fa-edit" id="3a"></i></td>
    //                 </tr>
    //                 <tr>
    //                     <td>Sala</td>
    //                     <td>Sensor</td>
    //                     <td>Activo</td>
    //                     <td><i class="far fa-edit" id="4a"></i></td>
    //                 </tr>
    //             </tbody>
    //         </table>


    //     </section>`
    
}
function callNewDevice() {
    sections.innerHTML = '';
    let sectionHtml = document.createElement('section');
    sectionHtml.classList.add('form-new-device');
    
    let titleSection = document.createElement('h2');
    titleSection.innerHTML = 'Add a new device';
    let instructions = document.createElement('p');
    instructions.innerHTML = 'Complete the information about your device';
    let formDevice = document.createElement('div');
    formDevice.classList.add('form-device');
    formDevice.setAttribute('id', 'form-new-device');
    let inputIdDevice = document.createElement('input');
    inputIdDevice.setAttribute('placeholder', 'ID device');
    inputIdDevice.setAttribute('id', 'idDevice');
    let btn_browse = document.createElement('button');
    btn_browse.innerHTML = 'Search';
    btn_browse.classList.add('button');
    btn_browse.setAttribute('id', 'btn_search');

    sectionHtml.appendChild(titleSection);
    sectionHtml.appendChild(instructions);
    formDevice.appendChild(inputIdDevice);
    sectionHtml.appendChild(formDevice);
    sectionHtml.appendChild(btn_browse);
    sections.appendChild(sectionHtml);
};
async function callSearchDevice() {
    let idDevice = document.querySelector('#idDevice').value;
    let formDevice = document.querySelector('#form-new-device');
    let newElement = document.createElement('div');
    let btn_send = document.querySelector('#btn_search');
    const docRefDevice = doc(db, 'devices', idDevice);
    const dataDevice = await getDoc(docRefDevice);
    console.log(formDevice);

    console.log(dataDevice.data().type);
    if (dataDevice.data().type === 'On-Off') {
        
        newElement.innerHTML = `
        <h2>Tipo de dispositivo On-Off</h2>
                
                <h3>Agrega un nombre para identificarlo: </h3>
                <input type="text" placeholder="Nombre">
                <h3>Se lecciona un icono : </h3>
                
                <div class="cards-icons">
                    <div class="card-icon">
                        <i class="fas fa-bath"></i>
                        <input type="radio" name="icon">
                    </div>
                    <div class="card-icon">
                        <i class="fas fa-couch"></i>
                        <input type="radio" name="icon">
                    </div>
                    <div class="card-icon">
                        <i class="fas fa-utensils"></i>
                        <input type="radio" name="icon">
                    </div>
                    <div class="card-icon">
                        <i class="fas fa-lightbulb"></i>
                        <input type="radio" name="icon">
                    </div>
                    <div class="card-icon">
                        <i class="fas fa-laptop"></i>
                        <input type="radio" name="icon" value="fas fa-laptop">
                    </div>
                    <div class="card-icon">
                        <i class="fas fa-chart-pie"></i>
                        <input type="radio" name="icon">
                    </div>
                </div>
                


            </div>
        
        `;
        


    }

    formDevice.appendChild(newElement);
    btn_send.setAttribute('id', 'btn_send');
    btn_send.innerHTML='Send';
    
   
}
async function sendNewDevice() {
    let idDevice = document.querySelector('#idDevice').value;

    const refDoc = doc(db, 'users', userId);
   await updateDoc(refDoc, {
       devices: arrayUnion(idDevice)
});
}

