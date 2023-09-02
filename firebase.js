// Import the functions you need from the SDKs you need
import { initializeApp ,getApp ,getApps } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBU-v7xbmfz_d2OIOGRf2YT51waFGK5OMo",
  authDomain: "instagram-f4d11.firebaseapp.com",
  projectId: "instagram-f4d11",
  storageBucket: "instagram-f4d11.appspot.com",
  messagingSenderId: "634138355770",
  appId: "1:634138355770:web:0af3b1dd048b9fa0f12d03"
};

// Initialize Firebase
const app = !getApps().length  ?  initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export {app,db,storage};