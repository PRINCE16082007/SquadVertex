// netlify/functions/webauthn-auth-request.js
const admin = require("firebase-admin");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  });
}
const db = admin.firestore();

const crypto = require("crypto");

exports.handler = async function (event) {
  try {
    const body = JSON.parse(event.body);
    const uid = body.uid;
    if (!uid) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "UID missing" }),
      };
    }

    // Generate secure random challenge
    const challengeBuffer = crypto.randomBytes(32);
    const challengeBase64 = challengeBuffer.toString("base64url");

    // Save challenge to Firestore for verification later
    await db.collection("users").doc(uid).set(
      {
        webauthnChallenge: challengeBase64,
        lastChallengeTime: admin.firestore.Timestamp.now(),
      },
      { merge: true }
    );

    // Retrieve user's registered credential IDs
    const credsSnap = await db
      .collection("users")
      .doc(uid)
      .collection("webauthnCredentials")
      .get();

    const allowCredentials = [];
    credsSnap.forEach((doc) => {
      allowCredentials.push({
        id: Buffer.from(doc.data().credentialId, "base64"),
        type: "public-key",
      });
    });

    // Compose publicKeyCredentialRequestOptions
    const publicKey = {
      challenge: challengeBase64,
      timeout: 60000,
      userVerification: "required",
      allowCredentials: allowCredentials.map((cred) => ({
        id: Buffer.from(cred.id).toString("base64url"),
        type: cred.type,
      })),
    };

    return {
      statusCode: 200,
      body: JSON.stringify(publicKey),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
