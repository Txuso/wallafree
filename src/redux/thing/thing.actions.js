import {
	convertCollectionsSnapshotToMap,
	firestore
} from '../../common/utils/firebase.utils';

import ThingActionsTypes from './thing.types';

export const addThingStart = thing => ({
	type: ThingActionsTypes.ADD_THING,
	payload: { thing: thing }
});

export const getCollectionsAsync = () => {
	return dispatch => {
		const collectionRef = firestore.collection('collections');
		dispatch(addThingStart());

		collectionRef
			.get()
			.then(snapShot => {
				const collectionsMap = convertCollectionsSnapshotToMap(
					snapShot
				);
				dispatch(addThingSuccess(collectionsMap));
			})
			.catch(error => dispatch(addThingFailure(error)));
	};
};

export const addThingSuccess = thing => ({
	type: ThingActionsTypes.ADD_THING_SUCCESS,
	payload: { thing: thing }
});

export const addThingFailure = error => ({
	type: ThingActionsTypes.ADD_THING_FAILURE,
	payload: { error: error }
});
