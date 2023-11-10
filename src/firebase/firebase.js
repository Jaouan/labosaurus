import * as firebase from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from 'firebase/auth';
import firebaseConfig from "./firebase-config.json"; // TODO dotenv ?
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

const app = firebase.initializeApp(firebaseConfig);
ExecutionEnvironment.canUseDOM && getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

export const logout = (afterAction = () => { }) =>
  signOut(auth).then(_ => afterAction(null));

export const login = async () => {
  try {
    await signInWithPopup(auth, googleProvider);
  } catch (err) {
    console.error(err);
  }
};