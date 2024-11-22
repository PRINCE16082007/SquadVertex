// Firebase Config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.getAuth();
const db = firebase.getFirestore(app);

// User Authentication
firebase.signInAnonymously(auth)
  .then(() => console.log("Signed in anonymously"))
  .catch(error => console.error("Error signing in:", error));

// Voting Function
async function voteForReplay(replayId) {
  const user = auth.currentUser;
  const userId = user.uid;

  const userDocRef = firebase.doc(db, "users", userId);
  const voteDocRef = firebase.doc(db, "votes", replayId);

  try {
    const userDoc = await firebase.getDoc(userDocRef);
    if (userDoc.exists()) {
      document.getElementById("status").innerText = "You have already voted!";
      return;
    }

    // Add vote
    await firebase.setDoc(userDocRef, { voted: true });
    await firebase.setDoc(voteDocRef, { count: firebase.increment(1) }, { merge: true });

    document.getElementById("status").innerText = "Vote submitted successfully!";
  } catch (error) {
    console.error("Error submitting vote:", error);
    document.getElementById("status").innerText = "Error submitting vote.";
  }
}