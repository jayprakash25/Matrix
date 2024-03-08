importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyCQaxpMIfF0jymQXPcumOrnTlzSHw3yU8w",
  authDomain: "the-hub-97b71.firebaseapp.com",
  projectId: "the-hub-97b71",
  storageBucket: "the-hub-97b71.appspot.com",
  messagingSenderId: "345338276403",
  appId: "1:345338276403:web:f45d5aa257e09479e85146",
  measurementId: "G-F6DP54PS4R",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
