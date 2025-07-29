// firebase_setup.js

// Firebase imports (v11.9.0 as requested)
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-firestore.js";
import { initializeAppCheck, ReCaptchaV3Provider } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-app-check.js";

// ✅ Your Firebase project config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Setup App Check with reCAPTCHA v3
const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider("6Ld395IrAAAAAIvG4gyf0vUJeI_jKOsI9XVn0jUx"),
  isTokenAutoRefreshEnabled: true, // 🌀 Firebase will refresh token every hour automatically
});

// ✅ Initialize Firestore (or any service you need)
const db = getFirestore(app);

// 🟡 Optional: Make it accessible globally if you’re not using modules
window.firebaseApp = app;
window.db = db;