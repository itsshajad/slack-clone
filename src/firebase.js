import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyDamTm-TmiygtlEG5LEKGHaIvSHB6AM6h0',
  authDomain: 'slack-fe9d8.firebaseapp.com',
  projectId: 'slack-fe9d8',
  storageBucket: 'slack-fe9d8.appspot.com',
  messagingSenderId: '441022050916',
  appId: '1:441022050916:web:0e2fed39289732cbb0a571',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
