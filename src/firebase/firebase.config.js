import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Check if we are running in the browser and have a project ID
const canInitialize = typeof window !== "undefined" && firebaseConfig.projectId;

let app = null;
let auth = null;
let db = null;
let storage = null;
let analytics = null;

if (canInitialize) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);

    // Dynamic browser import for Analytics
    import("firebase/analytics").then((module) => {
      module.isSupported().then((supported) => {
        if (supported && app) {
          analytics = module.getAnalytics(app);
        }
      });
    }).catch(err => console.warn("Firebase Analytics failed to load:", err));

  } catch (error) {
    console.error("Firebase initialization failed:", error);
  }
} else {
  if (typeof window !== "undefined") {
    console.warn("⚠️ Firebase missing keys or running on server side.");
  }
}

export { app, auth, db, storage, analytics };
export default app;