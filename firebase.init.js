// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJhI_1SYd8lG3OjKl7G1mgrgOr3-8uZZo",
  authDomain: "autoparts-service.firebaseapp.com",
  projectId: "autoparts-service",
  storageBucket: "autoparts-service.appspot.com",
  messagingSenderId: "1004490202855",
  appId: "1:1004490202855:web:50645502ac4cb9db6b4c42"
};
    
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth; 