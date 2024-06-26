import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAboBoeJwTbt-oglJfpKIC8T0UjndFoC94",
  authDomain: "myfirstapp-8cbc0.firebaseapp.com",
  projectId: "myfirstapp-8cbc0",
  storageBucket: "myfirstapp-8cbc0.appspot.com",
  messagingSenderId: "906167717106",
  appId: "1:906167717106:web:2bb1e85de62639ec48946b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app);

export {fireDB,auth};
