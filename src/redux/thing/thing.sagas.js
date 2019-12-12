import {
	addCollectionAndDocuments,
	convertCollectionsSnapshotToMap,
	firestore
} from '../../common/utils/firebase.utils';
import { addThingFailure, addThingSuccess } from './thing.actions';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import ThingActionsTypes from './thing.types';

export function* fetchThingsAsync() {
	try {
		const collectionRef = firestore.collection('things');
		const snapshot = yield collectionRef.get();
		const collectionsMap = yield call(
			convertCollectionsSnapshotToMap,
			snapshot
		);
		yield put(addThingSuccess(collectionsMap));
	} catch (error) {
		yield put(addThingFailure(error.message));
	}
}

export function* addThingAsync(action) {
	try {
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
