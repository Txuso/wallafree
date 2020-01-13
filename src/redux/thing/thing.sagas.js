import {
	addCollectionAndDocuments,
	addFilesToStorage,
	convertCollectionToArray,
	deleteDocuments,
	firestore
} from '../../common/utils/firebase.utils';
import {
	addThingFailure,
	addThingSuccess,
	getThingsFailure,
	getThingsSuccess,
	giveThingSuccess,
	giveThingsFailure
} from './thing.actions';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import ThingActionsTypes from './thing.types';
import { changeModalVisibility } from '../app/app.actions';

export function* fetchThingsAsync() {
	try {
		const collectionRef = yield firestore.collection('things').where('status', '==', 'active').get();

		const convertedCollectionArray = convertCollectionToArray(collectionRef);

		yield put(getThingsSuccess(convertedCollectionArray));
	} catch (error) {
		yield put(getThingsFailure(error.message));
	}
}

export function* addThingAsync(action) {
	try {
		const { imageUrl, name } = action.payload.thing;
		let generatedImageUrl =
			'https://firebasestorage.googleapis.com/v0/b/wallafree-app.appspot.com/o/images%2FUun%20Eric%20salvaje%222020-01-10T11%3A48%3A11.919Z%22?alt=media&token=3c8403ba-f75c-419a-aa7e-45ae1b955b0f';
		if (imageUrl) {
			generatedImageUrl = yield addFilesToStorage({
				name: name,
				imageToProcess: imageUrl
			});
		}

		action.payload.thing.imageUrl = generatedImageUrl;
		yield call(addCollectionAndDocuments, 'things', [ action.payload.thing ]);
		yield put(addThingSuccess(action.payload.thing, 'Nice! Your thing has been added'));
	} catch (error) {
		yield put(addThingFailure(error.message));
	}
}

export function* giveThingAsync(action) {
	try {
		yield call(addCollectionAndDocuments, 'deals', [ { ...action.payload, timestamp: new Date().getTime() } ]);

		yield firestore.collection('things').doc(action.payload.thingId).update({
			status: 'inactive'
		});

		const chatsToDelete = yield firestore.collection('chats').where('thingId', '==', action.payload.thingId);

		deleteDocuments(chatsToDelete);
		yield put(giveThingSuccess(action.payload.thingId));
		yield put(changeModalVisibility(true, 'Enjoy Your Thing :-)'));
	} catch (error) {
		yield put(giveThingsFailure(error.message));
	}
}
export function* getThingsCollectionsStart() {
	yield takeLatest(ThingActionsTypes.GET_THINGS, fetchThingsAsync);
}

export function* addThingStart() {
	yield takeLatest(ThingActionsTypes.ADD_THING, addThingAsync);
}

export function* giveThingStart() {
	yield takeLatest(ThingActionsTypes.GIVE_THING, giveThingAsync);
}
export function* thingSagas() {
	yield all([ call(getThingsCollectionsStart), call(addThingStart), call(giveThingStart) ]);
}
