// Firebase core
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

// Firebase Cloud Messaging
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// 🔥 Your Firebase configuration (as provided)
const firebaseConfig = {
  apiKey: "AIzaSyBpyCu8DzHm-sEV8vQWeOpvELMKwEeaBAI",
  authDomain: "dohelp-7d140.firebaseapp.com",
  projectId: "dohelp-7d140",
  storageBucket: "dohelp-7d140.firebasestorage.app",
  messagingSenderId: "228064919901",
  appId: "1:228064919901:web:b6d1f42822b129419ea8b4",
  measurementId: "G-61V67TYW8N",
};

// 🔹 Initialize Firebase
const app = initializeApp(firebaseConfig);

// 🔹 Analytics (safe check – avoids SSR / unsupported issues)
let analytics;
isSupported().then((supported) => {
  if (supported) {
    analytics = getAnalytics(app);
  }
});

// 🔹 Messaging
export const messaging = getMessaging(app);

// 🔐 PUBLIC VAPID KEY (as provided)
const VAPID_KEY =
  "BIWhgwdKKixoudiW4sKuSMi_eMpE1r4JxQpePCraP2i8O6XiEJbkkoL_CtSio5J4omUl8_pFliP2l2vN4qR9U-U";

/**
 * 🔔 Request permission & get FCM device token
 * Use this token in Register / Login API
 */
export const getDeviceToken = async () => {
  try {
    const permission = await Notification.requestPermission();

    if (permission !== "granted") {
      console.warn("Notification permission denied");
      return null;
    }

    const token = await getToken(messaging, {
      vapidKey: VAPID_KEY,
    });

    if (token) {
      console.log("FCM Device Token:", token);
      return token;
    } else {
      console.warn("No registration token available");
      return null;
    }
  } catch (error) {
    console.error("FCM token error:", error);
    return null;
  }
};

export default app;
