import firebase from "firebase";

const config = {
  apiKey: "AIzaSyDrVaLpZBCU0KVzrE_uNl8fmd8KCwKF4XM",
  authDomain: "chatty-react-85c35.firebaseapp.com",
  databaseURL: "https://chatty-react-85c35.firebaseio.com",
  projectId: "chatty-react-85c35",
  storageBucket: "chatty-react-85c35.appspot.com",
  messagingSenderId: "174196263995",
  appId: "1:174196263995:web:2b0f12788c1e7741cb201e",
};

// Initialize Firebase
firebase.initializeApp(config);
export const auth = firebase.auth;
export const db = firebase.database();
