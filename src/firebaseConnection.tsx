import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

let firebaseConfig = {
  apiKey: "AIzaSyCd5RCDVNI_N5lxhtxNQ823obp_2mchX6M",
  authDomain: "minha-vaga-especial-18bb7.firebaseapp.com",
  databaseURL: "https://minha-vaga-especial-18bb7-default-rtdb.firebaseio.com/",
  projectId: "minha-vaga-especial-18bb7",
  storageBucket: "minha-vaga-especial-18bb7.appspot.com",
  messagingSenderId: "791108802387",
  appId: "1:791108802387:web:0eaa0f146adb79ef6db3a6"
  };
  // Initialize Firebase

  if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);

  }

  export default firebase;
