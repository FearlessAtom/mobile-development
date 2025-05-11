import { initializeApp } from "@firebase/app";
import { initializeAuth, getReactNativePersistence } from "@firebase/auth";
import { getFirestore } from "@firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebase_config = 
{
    apiKey: "AIzaSyDQhwjL5MPx2b8-oYGnk18stSh8a6EPGVw",
    authDomain: "semenchyklab6-6299b.firebaseapp.com",
    projectId: "semenchyklab6-6299b",
    appId: "1:123197694356:android:82aa3b7cda37515468ef81",
}

const app = initializeApp(firebase_config);

const firestore = getFirestore(app);

const authentication = initializeAuth(app);

export { authentication, firestore };
