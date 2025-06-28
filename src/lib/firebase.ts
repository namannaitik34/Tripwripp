import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let app: FirebaseApp;
let auth: Auth;
let db: Firestore;
let storage: FirebaseStorage;

// We check if the config is valid and not using placeholder values.
export const isConfigured = 
  firebaseConfig.apiKey && 
  firebaseConfig.apiKey !== "PASTE_YOUR_API_KEY_HERE" && 
  !!firebaseConfig.projectId;

if (isConfigured) {
  // If the config is valid, initialize Firebase as usual.
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
} else {
  // If not configured, we provide dummy objects to prevent app from crashing.
  // The app will not have Firebase functionality but will be able to render.
  if (typeof window !== 'undefined') {
    console.warn("Firebase is not configured. App is running in a limited mode. Please provide Firebase credentials in the .env file for full functionality.");
  }
  app = {} as FirebaseApp;
  auth = {} as Auth;
  db = {} as Firestore;
  storage = {} as FirebaseStorage;
}

export { app, auth, db, storage };

const googleProvider = isConfigured ? new GoogleAuthProvider() : null;

export const signInWithGoogle = async () => {
    if (!isConfigured || !googleProvider) {
        return { success: false, error: "Firebase not configured." };
    }
    try {
        await signInWithPopup(auth, googleProvider);
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message, code: error.code };
    }
};

export const signOutWithGoogle = async () => {
    if (!isConfigured) {
        return { success: false, error: "Firebase not configured." };
    }
    try {
        await signOut(auth);
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};
