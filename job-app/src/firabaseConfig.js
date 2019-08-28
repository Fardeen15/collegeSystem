import firebase from 'firebase'
var firebaseConfig = {
    apiKey: "AIzaSyCiN4aF04dvyMgwMFu-lOqMMXBQcXUvkfE",
    authDomain: "campusrecruitment-system.firebaseapp.com",
    databaseURL: "https://campusrecruitment-system.firebaseio.com",
    projectId: "campusrecruitment-system",
    storageBucket: "",
    messagingSenderId: "619734899398",
    appId: "1:619734899398:web:af6060c9325b4201"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  export const db = firebase.database()
  export const auth = firebase.auth()