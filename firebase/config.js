// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAZ0kQd2n3KEvrnz7ZPvzMkp-6Q6IJ5t0g',
  authDomain: 'imdb-poster.firebaseapp.com',
  projectId: 'imdb-poster',
  storageBucket: 'imdb-poster.appspot.com',
  messagingSenderId: '480144335995',
  appId: '1:480144335995:web:addfa3f13e80c6929e6ede'
}

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig)
export const FirebaseAuth = getAuth(FirebaseApp)

export const FirebaseDB = getFirestore(FirebaseApp)
