// firebase_setup.js

// Firebase imports (v11.9.0 as requested)
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-firestore.js";
import { initializeAppCheck, ReCaptchaV3Provider } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-app-check.js";

    const firebaseConfig = {
      apiKey: "AIzaSyBV7Jg0BVzeCNQW9oiIiNItnejUsjj2DhA",
      authDomain: "squadvertex2007.firebaseapp.com",
      projectId: "squadvertex2007",
      storageBucket: "squadvertex2007.appspot.com",
      messagingSenderId: "168905083514",
      appId: "1:168905083514:web:c8bbe2ce9f87800a0f09c3"
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