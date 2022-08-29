// @ts-nocheck
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const algoliasearch = require('algoliasearch');

admin.initializeApp();

const db = admin.firestore();

const APP_ID = functions.config().algolia.app;
const ADMIN_KEY = functions.config().algolia.key;

const client = algoliasearch(APP_ID, ADMIN_KEY);
const index = client.initIndex('books');

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

exports.createUserRecord = functions.auth.user().onCreate((user, context) => {
  const userRef = db.doc(`users/${user.uid}`);

  return userRef.set({
    email: user.email,
    uid: user.uid,
    createdAt: context.timestamp,
  });
});

exports.addToIndex = functions.firestore
  .document('books/{bookId}')
  .onCreate((snapshot) => {
    const data = snapshot.data();
    const objectID = snapshot.id;

    return index.saveObject({ ...data, objectID });
  });

exports.updateIndex = functions.firestore
  .document('books/{bookId}')
  .onUpdate((change) => {
    const newData = change.after.data();
    const objectID = change.after.id;
    return index.saveObject({ ...newData, objectID });
  });

exports.deleteFromIndex = functions.firestore
  .document('books/{bookId}')
  .onDelete((snapshot) => index.deleteObject(snapshot.id));
