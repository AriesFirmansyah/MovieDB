import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyB1X_XNxxe92T2-03QBb62foDgoesNqAH4",
    authDomain: "risdev-moviedb.firebaseapp.com",
    projectId: "risdev-moviedb",
    storageBucket: "risdev-moviedb.appspot.com",
    messagingSenderId: "668838976554",
    appId: "1:668838976554:web:21ec08d31b5ce08b69f753",
    measurementId: "G-YZGV3501HV"
};

// Initialize Firebase
export const firebase = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// firebase.initializeApp(firebaseConfig);

// export default firebase;