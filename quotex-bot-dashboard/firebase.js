import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Firebase configuration (replace with your own Firebase credentials)
const firebaseConfig = {
    apiKey: "AIzaSyCLE2enFQGRk9BtYoyH-rntF-SucbCC8XA",
    authDomain: "quotex-3e76b.firebaseapp.com",
    projectId: "quotex-3e76b",
    storageBucket: "quotex-3e76b.firebasestorage.app",
    messagingSenderId: "378721252191",
    appId: "1:378721252191:web:e61f97987e3b36a7063cea",
    measurementId: "G-WXQP84YSBN"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
