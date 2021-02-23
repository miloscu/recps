import firebase from 'firebase';
import firestore from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyBFJQ0U_8uz6qGnCYFMc6goHTIR-yDS06o",
    authDomain: "recps-d9316.firebaseapp.com",
    projectId: "recps-d9316",
    storageBucket: "recps-d9316.appspot.com",
    messagingSenderId: "618731632463",
    appId: "1:618731632463:web:451a23cf78904f9c65773a",
    measurementId: "G-VZE8T79H7P"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
firebaseApp.firestore().settings({ timestampsInSnapshots: true })

firebase.analytics();

//export firestore database;

export default firebaseApp.firestore();