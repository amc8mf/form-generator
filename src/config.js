import firebase from "firebase";
import "firebase/auth";


var firebaseConfig = {
  apiKey: "AIzaSyDZPVTmC3wArRQsAbNuGNIOzCguhiYXuoA",
  authDomain: "react-auth-622da.firebaseapp.com",
  projectId: "react-auth-622da",
  storageBucket: "react-auth-622da.appspot.com",
  messagingSenderId: "818693802427",
  appId: "1:818693802427:web:2af159011982c36c6d5c9e"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firebaseAuth = firebase.auth;
