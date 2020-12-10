import firebase from "firebase/app"
import "firebase/storage"
import "firebase/database";
import "firebase/firestore"
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCHh5EGrM732hMWqdk08dpXsZrH97ZnXeY",
  authDomain: "upload-img-783cf.firebaseapp.com",
  databaseURL: "https://upload-img-783cf.firebaseio.com",
  projectId: "upload-img-783cf",
  storageBucket: "upload-img-783cf.appspot.com",
  messagingSenderId: "245967896589",
  appId: "1:245967896589:web:d4ce3f1e62f693dafa9544",
  measurementId: "G-20KD23PPQ0"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const storage = firebaseApp.storage().ref();
const database = firebaseApp.database().ref('kahoot');
const db = firebaseApp.firestore();
export {  db,database,storage, firebaseApp, firebase as default };