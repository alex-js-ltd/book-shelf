// @ts-nocheck
const functions = require('firebase-functions');
const algoliasearch = require('algoliasearch');

const APP_ID = functions.config().algolia.app;
const ADMIN_KEY = functions.config().algolia.key;

const client = algoliasearch(APP_ID, ADMIN_KEY);
const index = client.initIndex('books');

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

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
