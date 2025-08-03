// components/firebase_setup.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-auth.js";
import { initializeAppCheck, ReCaptchaV3Provider } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-app-check.js";

 // 🔧 Your Firebase config
  const firebaseConfig = {
    apiKey: "AIzaSyBV7Jg0BVzeCNQW9oiIiNItnejUsjj2DhA",
    authDomain: "squadvertex2007.firebaseapp.com",
    projectId: "squadvertex2007",
    storageBucket: "squadvertex2007.appspot.com",
    messagingSenderId: "168905083514",
    appId: "1:168905083514:web:c8bbe2ce9f87800a0f09c3"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider("6Ld395IrAAAAAIvG4gyf0vUJeI_jKOsI9XVn0jUx"),
  isTokenAutoRefreshEnabled: true
});

let appCheckReady = new Promise((resolve) => {
  const unsubscribe = appCheck.onTokenChanged((token) => {
    if (token) {
      window.firebaseToken = token.token;
      resolve(token.token);
      unsubscribe();
    }
  });
});

export { app, auth, db, appCheckReady };