import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

import { getStorage } from "firebase/storage";

import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
	apiKey: "AIzaSyBKD7s2t5cNEpSQ8hvHpAJ9HxsGW6u_v04",
	authDomain: "app-eventos-e1850.firebaseapp.com",
	projectId: "app-eventos-e1850",
	storageBucket: "app-eventos-e1850.appspot.com",
	messagingSenderId: "513817423926",
	appId: "1:513817423926:web:05b7e32fb01369b5ee2897",
};

const firebase = initializeApp(firebaseConfig);

const auth = getAuth(firebase);

const storage = getStorage(firebase);

const db = getFirestore(firebase);

export { firebase, auth, storage,db };



