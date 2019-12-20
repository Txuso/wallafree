import ChatActionsTypes from './chat.types';

export const getChatsStart = userId => ({
	type: ChatActionsTypes.GET_CHATS,
	payload: { userId: userId }
});

export const getChatsSuccess = chats => ({
	type: ChatActionsTypes.GET_CHATS_SUCCESS,
	payload: { chats: chats }
});

export const getChatsFailure = error => ({
	type: ChatActionsTypes.GET_CHATS_FAILURE,
	payload: { error: error }
});

export const createChatStart = (thingId, userId) => ({
	type: ChatActionsTypes.CREATE_CHAT,
	payload: { thingId: thingId, userId: userId }
});

export const createChatSuccess = chat => ({
	type: ChatActionsTypes.CREATE_CHAT_SUCCESS,
	payload: { chat: chat }
});

export const createChatFailure = error => ({
	type: ChatActionsTypes.CREATE_CHAT_FAILURE,
	payload: { error: error }
});

export const sendMessage = (message, thingId, userId) => ({
	type: ChatActionsTypes.SEND_MESSAGE,
	payload: { message: message, thingId: thingId, userId: userId }
});

export const sendMessageSuccess = (message, thingId) => ({
	type: ChatActionsTypes.SEND_MESSAGE_SUCCESS,
	payload: { message: message, thingId: thingId }
});

export const sendMessageFailure = error => ({
	type: ChatActionsTypes.SEND_MESSAGE_FAILURE,
	payload: { error: error }
});
