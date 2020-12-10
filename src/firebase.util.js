import firebase from 'firebase/app';
import 'firebase/auth';
import "firebase/firestore";

const REACT_APP_FIREBASECONFIG = {
    apiKey: process.env.REACT_APP_API_KEY ,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN ,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_AUTH_PROJECT_ID,
    storageBucket: process.env.REACT_APP_AUTH_STORAGE_BUCKET,
    messagingSenderId:process.env.REACT_APP_AUTH_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_AUTH_APP_ID
  };

firebase.initializeApp(REACT_APP_FIREBASECONFIG);

export const auth = firebase.auth();

export const db = firebase.firestore();
const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGmail = () => auth.signInWithRedirect(provider);

export default firebase;