import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyAM5W-gfm6LQiB19wbthZUlT1M1oNPYL4o",
    authDomain: "civil-regis.firebaseapp.com",
    databaseURL: "https://civil-regis.firebaseio.com",
    projectId: "civil-regis",
    storageBucket: "civil-regis.appspot.com",
    messagingSenderId: "76254668988",
    appId: "1:76254668988:web:4c7d1867be9772729988b9",
    measurementId: "G-HYGHHEQXXD"
};

firebase.initializeApp(firebaseConfig);
export default firebase;