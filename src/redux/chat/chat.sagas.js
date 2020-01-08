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

		yield put(sendMessageSuccess(newMessage));
	} catch (error) {
		yield put(sendMessageFailure(error.message));
	}
}

function* syncUsers() {
	// #1
	const channel = new eventChannel(emitter => {
		const listeners = [];

		firestore.collection('chats').onSnapshot(querySnapshot => {
			querySnapshot.forEach(doc => {
				const { userId, requestUserId } = doc.data();
				const currenUserId = localStorage.getItem('userId');
				if (userId === currenUserId || requestUserId === currenUserId) {
					console.log('doc.data().userId', doc.data().userId);
					listeners.push(
						firestore
							.collection('chats')
							.doc(doc.id)
							.collection('messages')
							.onSnapshot(snapshot => {
								emitter({
									data: snapshot.docs
								});
							})
					);
				}
			});
		});

		return () => {
			listeners.forEach(listener => listener.off());
		};
	});

	while (true) {
		const { data } = yield take(channel);

		const newMessages = data.map(snap => snap.data());
		const currentUrl = window.location.href;
		// last message in the array contains the last sent message
		if (
			newMessages.length > 0 &&
			newMessages[newMessages.length - 1].chatId ===
				currentUrl.substring(currentUrl.lastIndexOf('/') + 1)
		) {
			yield put(getChatMessagesSuccess(newMessages));
		}
	}
}

export function* checkForNewChats() {}

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
