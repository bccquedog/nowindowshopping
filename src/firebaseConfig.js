// Firebase configuration for No Window Shopping
//
// NOTE: the audiobook on /mgcu/library/thirty-minutes-in-cabo uses a *different*
// Firebase project — `nwspro-9044c` — for its audio + cover hosting. Those URLs
// are hardcoded in src/mgcu/booksData.ts and do not go through this SDK config.
// The rest of the site (webstore, raffles, Firestore, auth) stays on
// `nws-card-suite`.
export const firebaseConfig = {
  apiKey: "AIzaSyCq4PDS75dgPpZNgZC6HQNQ6dUAqC3Lvm0",
  authDomain: "nws-card-suite.firebaseapp.com",
  projectId: "nws-card-suite",
  storageBucket: "nws-card-suite.appspot.com",
  messagingSenderId: "225556580785",
  appId: "1:225556580785:web:84b04721ed04221e419590",
  measurementId: "G-ZJG4FLE1V3"
};
