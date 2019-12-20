import {
	addSingleCollectionWithId,
	convertCollectionToArray,
	firestore
} from '../../common/utils/firebase.utils';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
	createChatFailure,
	createChatSuccess,
	getChatsFailure,
	getChatsSuccess,
	sendMessageFailure,
	sendMessageSuccess
} from './chat.actions';

import ChatActionsTypes from './chat.types';
import firebase from 'firebase';

export function* fetchMyChatsAsync(action) {
	try {
		const collectionRef = yield firestore.collection('chats').get();

		const convertedCollectionArray = convertCollectionToArray(
			collectionRef
		);

		yield put(getChatsSuccess(convertedCollectionArray));
	} catch (error) {
		yield put(getChatsFailure(error.message));
	}
}

export function* addChatAsync(action) {
	try {
		const { userId, thingId } = action.payload;
		var chatsRef = yield firestore
			.collection('chats')
			.doc(thingId)
			.get();

		if (!chatsRef.exists) {
			const newChat = {
				messages: [],
				userId: userId
			};
			yield call(addSingleCollectionWithId, 'chats', thingId, newChat);
			yield put(createChatSuccess(newChat));
		} else {
			yield put(createChatSuccess(null));
		}
	} catch (error) {
		yield put(createChatFailure(error.message));
	}
}

export function* sendMessageAsync(action) {
	try {
		const { message, userId, thingId } = action.payload;
		const newMessage = {
			userId: userId,
			message: message,
			timestamp: new Date().getTime()
		};

		var chatsRef = yield firestore.collection('chats').doc(thingId);

		yield chatsRef.set(
			{ messages: firebase.firestore.FieldValue.arrayUnion(newMessage) },
			{ merge: true }
		);

		yield put(sendMessageSuccess(newMessage, thingId));
	} catch (error) {
		yield put(sendMessageFailure(error.message));
	}
}

export function* sendMessageStart() {
	yield takeLatest(ChatActionsTypes.SEND_MESSAGE, sendMessageAsync);
}

export function* getMyChatsCollectionsStart() {
	yield takeLatest(ChatActionsTypes.GET_CHATS, fetchMyChatsAsync);
}

export function* addChatStart() {
	yield takeLatest(ChatActionsTypes.CREATE_CHAT, addChatAsync);
}

export function* chatSagas() {
	yield all([
		call(getMyChatsCollectionsStart),
		call(addChatStart),
		call(sendMessageStart)
	]);
}
