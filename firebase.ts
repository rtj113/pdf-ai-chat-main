import { getStorage } from "firebase/storage";
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
declare var process: {
  env: {
    [x: string]: string
    NODE_ENV: string
  }
}
const firebaseConfig = {
  apiKey: process.env.FIREBASE_PRIVATE_KEY,
  authDomain: process.env.FIREBASE_AUTH_URI,
  projectId: process.env.FIREBASE_PROJECT_ID,
  messagingSenderId: process.env.FIREBASE_CLIENT_ID,
  appId: process.env.FIREBASE_APP_ID
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };