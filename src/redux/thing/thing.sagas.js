import {
	addCollectionAndDocuments,
	addFilesToStorage,
	convertCollectionToArray,
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
		const collectionRef = yield firestore
			.collection('things')
			.where('status', '==', 'active')
			.get();

		const convertedCollectionArray = convertCollectionToArray(
			collectionRef
		);

		yield put(getThingsSuccess(convertedCollectionArray));
	} catch (error) {
		yield put(getThingsFailure(error.message));
	}
}

export function* addThingAsync(action) {
	try {
		const { imageUrl, name } = action.payload.thing;
		const generatedImageUrl = yield addFilesToStorage({
			name: name,
			imageToProcess: imageUrl
		});

		action.payload.thing.imageUrl = generatedImageUrl;
		yield call(addCollectionAndDocuments, 'things', [action.payload.thing]);
		yield put(addThingSuccess(action.payload.thing));
	} catch (error) {
		yield put(addThingFailure(error.message));
	}
}

export function* giveThingAsync(action) {
	try {
		yield call(addCollectionAndDocuments, 'deals', [
			{ ...action.payload, timestamp: new Date().getTime() }
		]);

		yield firestore
			.collection('things')
			.doc(action.payload.thingId)
			.update({
				status: 'inactive'
			});

		const chatsToDelete = yield firestore
			.collection('chats')
			.where('thingId', '==', action.payload.thingId);
		// TODO: Move to utils file
		chatsToDelete.get().then(querySnapshot => {
			querySnapshot.forEach(doc => {
				doc.ref.delete();
			});
		});

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
	yield all([
		call(getThingsCollectionsStart),
		call(addThingStart),
		call(giveThingStart)
	]);
}
