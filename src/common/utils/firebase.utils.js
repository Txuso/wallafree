import 'firebase/firestore';
import 'firebase/auth';

import firebase from 'firebase/app';

const firebaseConfig = {
	apiKey: 'AIzaSyBErQ1VtpqSY_I88J9YDLeERCmyh9vXJKw',
	authDomain: 'wallafree-app.firebaseapp.com',
	databaseURL: 'https://wallafree-app.firebaseio.com',
	projectId: 'wallafree-app',
	storageBucket: 'wallafree-app.appspot.com',
	messagingSenderId: '910189518821',
	appId: '1:910189518821:web:1c88cb24346c89c29c590c',
	measurementId: 'G-0170S5GP2T'
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();

export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
// Always show google email accounts popup
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default signInWithGoogle;
