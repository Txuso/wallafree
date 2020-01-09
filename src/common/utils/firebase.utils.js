import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage'; // <----

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
export const createUserProfileDocument = async (userAuth, additionalData) => {
	if (!userAuth) {
		return;
	} else {
		const userRef = firestore.doc(`users/${userAuth.uid}`);

		const snapShot = await userRef.get();

		if (!snapShot.exists) {
			const { displayName, email } = userAuth;

			const createdAt = new Date();
			const imageUrl =
				'https://media.istockphoto.com/vectors/avatar-man-thin-line-flat-icon-linear-vector-symbol-colorful-long-vector-id912207906?k=6&m=912207906&s=612x612&w=0&h=V58lnn72hlRKtzFtMYcLTftUfl7zP2Gc6OpFQL_DJWs=';

			try {
				await userRef.set({
					displayName,
					email,
					createdAt,
					imageUrl,
					...additionalData
				});
			} catch (error) {
				console.error('error creating user', error.message);
			}
		}
		return userRef;
	}
};

export const getSingleCollection = async (collectionKey, id) => {
	const recordRef = await firestore.doc(`${collectionKey}/${id}`).get();

	return await recordRef.data();
};

export const updateDocuments = async (collectionKey, objectToUpdate) => {
	const collectionRef = firestore.collection(collectionKey);
	return await collectionRef.doc(objectToUpdate.id).update(objectToUpdate);
};

export const addSingleCollectionWithId = async (
	collectionKey,
	id,
	objectToAdd
) => {
	const collectionRef = firestore.collection(collectionKey);
	return await collectionRef.doc(id).set(objectToAdd);
};

export const addCollectionAndDocuments = async (
	collectionKey,
	objectsToAdd
) => {
	const collectionRef = firestore.collection(collectionKey);

	const batch = firestore.batch();

	objectsToAdd.forEach(object => {
		const newDocRef = collectionRef.doc();
		batch.set(newDocRef, object);
	});

	return await batch.commit();
};

export const addFilesToStorage = async imageToAdd => {
	const imageName = imageToAdd.name + JSON.stringify(new Date());

	return await storage
		.child(`images/${imageName}`)
		.putString(imageToAdd.imageToProcess, 'data_url')
		.then(snapshot => {
			return snapshot.ref.getDownloadURL(); // Will return a promise with the download link
		});
};
export const convertCollectionToArray = collection => {
	return collection.docs.map(doc => {
		const data = doc.data();
		return { ...data, id: doc.id };
	});
};

export const convertCollectionsSnapshotToMap = collection => {
	const transformedCollection = collection.docs.map(doc => {
		const { title, items } = doc.data();

		return {
			routeName: encodeURI(title.toLowerCase()),
			id: doc.id,
			title,
			items
		};
	});

	return transformedCollection.reduce((accumulator, collection) => {
		accumulator[collection.title.toLowerCase()] = collection;
		return accumulator;
	}, {});
};
export const getCurrentUser = () => {
	return new Promise((resolve, reject) => {
		const unsubscribe = auth.onAuthStateChanged(userAuth => {
			unsubscribe();
			resolve(userAuth);
		}, reject);
	});
};
export const auth = firebase.auth();

export const firestore = firebase.firestore();

export const storage = firebase.storage().ref();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
// Always show google email accounts popup
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default signInWithGoogle;
