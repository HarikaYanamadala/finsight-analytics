// src/auth/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  // ...rest from your Firebase console
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
