// This file must live at the ROOT of your GitHub Pages site
// (same folder as index.html and dashboard.html), not in a subfolder.
// It's what lets Chrome show a notification even when the dashboard
// tab isn't open or the phone is locked.

importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

// ---- SAME CONFIG AS YOUR OTHER FILES ----
firebase.initializeApp({
  apiKey: "AIzaSyDplUbmXozbk_Xylv727cIE_LwViBsCoKg",
  authDomain: "d2-assemble.firebaseapp.com",
  projectId: "d2-assemble",
  storageBucket: "d2-assemble.firebasestorage.app",
  messagingSenderId: "458663868012",
  appId: "1:458663868012:web:a7058f429fe59ac65e8a49"
});

const messaging = firebase.messaging();

// Handles notifications that arrive while the dashboard tab is
// closed or in the background (this is the whole point of Option 2).
messaging.onBackgroundMessage((payload) => {
  const title = payload.notification?.title || 'D2 — someone needs you';
  const options = {
    body: payload.notification?.body || '',
    icon: 'https://em-content.zobj.net/source/apple/354/beer-mug_1f37a.png',
    tag: 'd2-call', // reuses the same notification slot instead of stacking
    requireInteraction: true // stays on screen until dismissed
  };
  self.registration.showNotification(title, options);
});
