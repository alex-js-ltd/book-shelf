// @ts-nocheck
const functions = require('firebase-functions');
const admin = require('firebase-admin');


admin.initializeApp();

const db = admin.firestore();



// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

exports.createUserRecord = functions.auth.user().onCreate((user, context) => {
  const userRef = db.doc(`users/${user.uid}`);

  return userRef.set({
    email: user.email,
    uid: user.uid,
    createdAt: context.timestamp,
    readingList: [],
  });
});

