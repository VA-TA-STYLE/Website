import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCfyWfh0QM8ARxgRQoiALKumLN38TV_0H4",
  authDomain: "my-personal-site-571fa.firebaseapp.com",
  projectId: "my-personal-site-571fa",
  storageBucket: "my-personal-site-571fa.firebasestorage.app",
  messagingSenderId: "750667011566",
  appId: "1:750667011566:web:7646010e5039e354786aff",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
