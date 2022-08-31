import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDnCex7v7L_xCqH3rcPvRw_MffEN3ge-Q4',
  authDomain: 'crwn-clothing-db-91630.firebaseapp.com',
  projectId: 'crwn-clothing-db-91630',
  storageBucket: 'crwn-clothing-db-91630.appspot.com',
  messagingSenderId: '912623418096',
  appId: '1:912623418096:web:124e4b5cf206a596e42035',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
