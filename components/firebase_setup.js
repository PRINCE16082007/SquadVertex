// Firebase imports (v11.9.0)
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-firestore.js";
import { initializeAppCheck, ReCaptchaV3Provider } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-app-check.js";

// ✅ Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBV7Jg0BVzeCNQW9oiIiNItnejUsjj2DhA",
  authDomain: "squadvertex2007.firebaseapp.com",
  projectId: "squadvertex2007",
  storageBucket: "squadvertex2007.appspot.com",
  messagingSenderId: "168905083514",
  appId: "1:168905083514:web:c8bbe2ce9f87800a0f09c3"
};

// ✅ Initialize Firebase App
const app = initializeApp(firebaseConfig);

// ✅ Setup App Check with reCAPTCHA v3
const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider("6Ld395IrAAAAAIvG4gyf0vUJeI_jKOsI9XVn0jUx"),
  isTokenAutoRefreshEnabled: true
});

// ✅ Initialize Firestore
const db = getFirestore(app);

// ✅ Expose to global window scope
window.firebaseApp = app;
window.db = db;
window.appCheck = appCheck;

// 🪵 Log if something breaks (like App Check not initializing)
appCheck?.then?.(() => {
  console.log("✅ App Check initialized");
}).catch((e) => {
  console.warn("⚠️ App Check failed:", e.message);
});