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
	getChatsSuccess
} from './chat.actions';

import ChatActionsTypes from './chat.types';
import firebase from 'firebase';

export function* fetchChatsAsync(action) {
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
		const newChat = {
			messages: [],
			userId: userId
		};

		yield call(addSingleCollectionWithId, 'chats', thingId, newChat);
		yield put(createChatSuccess(newChat));
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
			timestamp: new Date()
		};

		var chatsRef = yield firestore.collection('chats').doc(thingId);

		yield chatsRef.update({
			messages: firebase.firestore.FieldValue.arrayUnion(newMessage)
		});

		yield put(createChatSuccess(newMessage));
	} catch (error) {
		yield put(createChatFailure(error.message));
	}
}

export function* sendMessageStart() {
	yield takeLatest(ChatActionsTypes.SEND_MESSAGE, sendMessageAsync);
}

export function* getChatsCollectionsStart() {
	yield takeLatest(ChatActionsTypes.GET_CHATS, fetchChatsAsync);
}

export function* addChatStart() {
	yield takeLatest(ChatActionsTypes.CREATE_CHAT, addChatAsync);
}

export function* chatSagas() {
	yield all([
		call(getChatsCollectionsStart),
		call(addChatStart),
		call(sendMessageStart)
	]);
}
