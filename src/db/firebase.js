import firebase from "firebase";

import "firebase/auth/dist/index.cjs";
import "firebase/database/dist/index.cjs";

const defaultConfig = {
  apiKey: "AIzaSyBH6VcBZXu7y85antUrfPksphl7LcK-mj8",
  authDomain: "pwitw-kb.firebaseapp.com",
  databaseURL: "https://pwitw-kb.firebaseio.com",
  projectId: "pwitw-kb",
  storageBucket: "pakkesocial-id.appspot.com",
};

if (!firebase.apps.length) {
  firebase.initializeApp(defaultConfig);
  // const reduxSagaFirebase = new ReduxSagaFirebase(myFirebaseApp)
}

//Use Admin SDK
const auth = firebase.auth();
const fsdb = firebase.firestore();

const settings = { timestampsInSnapshots: true };
fsdb.settings(settings);

export { auth, fsdb };