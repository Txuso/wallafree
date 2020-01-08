import {
	addCollectionAndDocuments,
	convertCollectionToArray,
	firestore
} from '../../common/utils/firebase.utils';
import { all, call, put, take, takeLatest } from 'redux-saga/effects';
import {
	createChatFailure,
	createChatSuccess,
	getChatMessagesFailure,
	getChatMessagesSuccess,
	getChatsFailure,
	getChatsSuccess,
	sendMessageFailure,
	sendMessageSuccess
} from './chat.actions';

import ChatActionsTypes from './chat.types';
import { eventChannel } from 'redux-saga';

export function* fetchMyChatsAsync(action) {
	try {
		const collectionRef = yield firestore
			.collection('chats')
			.where('requestUserId', '==', action.payload.userId)
			.get();
		const collectionRef2 = yield firestore
			.collection('chats')
			.where('userId', '==', action.payload.userId)
			.get();

		const convertedCollectionArray = convertCollectionToArray(
			collectionRef
		);
		const convertedCollectionArray2 = convertCollectionToArray(
			collectionRef2
		);

		yield put(
			getChatsSuccess(
				convertedCollectionArray.concat(convertedCollectionArray2)
			)
		);
	} catch (error) {
		yield put(getChatsFailure(error.message));
	}
}

export function* fetchMyChatMessagesAsync(action) {
	try {
		const collectionRef = yield firestore
			.collection('chats')
			.doc(action.payload.chatId)
			.collection('messages')
			.get();

		const convertedCollectionArray = convertCollectionToArray(
			collectionRef
		);
		yield put(getChatMessagesSuccess(convertedCollectionArray));
	} catch (error) {
		yield put(getChatMessagesFailure(error.message));
	}
}

export function* addChatAsync(action) {
	try {
		const { ownerId, requestUserId, thingId } = action.payload;
		const newChat = {
			requestUserId: requestUserId,
			userId: ownerId,
			thingId: thingId
		};

		yield call(addCollectionAndDocuments, 'chats', [newChat]);
		yield put(createChatSuccess(newChat));
	} catch (error) {
		yield put(createChatFailure(error.message));
	}
}

export function* sendMessageAsync(action) {
	try {
		const { message, userId, chatId } = action.payload;
		const newMessage = {
			userId: userId,
			message: message,
			timestamp: new Date().getTime(),
			chatId: chatId
		};

		yield firestore
			.collection('chats')
			.doc(chatId)
			.collection('messages')
			.add(newMessage);

		// yield chatsRef.set(
		// 	{ messages: firebase.firestore.FieldValue.arrayUnion(newMessage) },
		// 	{ merge: true }
		// );
		// yield call(addSingleCollectionWithId, 'chats', chatId, newMessage);

		yield put(sendMessageSuccess(newMessage));
	} catch (error) {
		yield put(sendMessageFailure(error.message));
	}
}

function* syncUsers() {
	// #1
	const channel = new eventChannel(emitter => {
		const listeners = [];
		listeners.push(
			firestore
				.collection('chats')
				.doc('EXvN84nhbbYxdBU1FcBr')
				.collection('messages')
				.onSnapshot(snapshot => {
					emitter({
						data: snapshot.docs
					});
				})
		);

		listeners.push(
			firestore
				.collection('chats')
				.doc('aWTNraILYqApZG9tSOWI')
				.collection('messages')
				.onSnapshot(snapshot => {
					emitter({
						data: snapshot.docs
					});
				})
		);

		return () => {
			// listeners.forEach.off();
		};
	});

	while (true) {
		const { data } = yield take(channel);

		const newMessages = data.map(snap => snap.data());

		if (
			newMessages.length > 0 &&
			newMessages[newMessages.length - 1].chatId ===
				window.location.href.substring(
					window.location.href.lastIndexOf('/') + 1
				)
		) {
			yield put(getChatMessagesSuccess(newMessages));
		}
	}
}

export function* sendMessageStart() {
	yield takeLatest(ChatActionsTypes.SEND_MESSAGE, sendMessageAsync);
}

export function* getMyChatsCollectionsStart() {
	yield takeLatest(ChatActionsTypes.GET_CHATS, fetchMyChatsAsync);
}

export function* getMyChatMessagesCollectionsStart() {
	yield takeLatest(
		ChatActionsTypes.GET_CHAT_MESSAGES,
		fetchMyChatMessagesAsync
	);
}

export function* addChatStart() {
	yield takeLatest(ChatActionsTypes.CREATE_CHAT, addChatAsync);
}

export function* chatSagas() {
	yield all([
		call(getMyChatsCollectionsStart),
		call(addChatStart),
		call(sendMessageStart),
		call(getMyChatMessagesCollectionsStart),
		call(syncUsers)
	]);
}
