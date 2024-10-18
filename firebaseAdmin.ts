import {
  // initializeApp,
  getApps, App, getApp,
  // cert
} from "firebase-admin/app";
import admin from "firebase-admin"
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

let app: App;

if (getApps().length === 0) {
  app = admin.initializeApp({
    // credential: cert(serviceAccount as any),
    credential: admin.credential.applicationDefault(),
    databaseURL: "https://DATABASE_NAME.firebaseio.com"
  });
} else {
  app = getApp();
}

const adminDb = getFirestore(app);
const adminStorage = getStorage(app);

export { app as adminApp, adminDb, adminStorage }