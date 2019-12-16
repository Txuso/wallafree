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
	getThingsSuccess
} from './thing.actions';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import ThingActionsTypes from './thing.types';

export function* fetchThingsAsync() {
	try {
		const collectionRef = yield firestore.collection('things').get();

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
export function* getThingsCollectionsStart() {
	yield takeLatest(ThingActionsTypes.GET_THINGS, fetchThingsAsync);
}

export function* addThingStart() {
	yield takeLatest(ThingActionsTypes.ADD_THING, addThingAsync);
}

export function* thingSagas() {
	yield all([call(getThingsCollectionsStart), call(addThingStart)]);
}
