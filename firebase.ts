import { getStorage } from "firebase/storage";
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyArCVIMmHoFLQt2Q_2XlripY7soVYL4FBA",
  authDomain: "ai-to-pdf-file-chat.firebaseapp.com",
  projectId: "ai-to-pdf-file-chat",
  storageBucket: "ai-to-pdf-file-chat.appspot.com",
  messagingSenderId: "934533732178",
  appId: "1:934533732178:web:bff7cc4ec386d802b34c8b"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };