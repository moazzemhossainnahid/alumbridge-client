// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBUfIn0z_6VXC-0l21ejFlWcvkLZUM-iVU",
  authDomain: "alumbridge-5f82d.firebaseapp.com",
  projectId: "alumbridge-5f82d",
  storageBucket: "alumbridge-5f82d.appspot.com",
  messagingSenderId: "57798068775",
  appId: "1:57798068775:web:c040d87a100ee43ead5c02"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth; 