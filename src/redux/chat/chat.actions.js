import ChatActionsTypes from './chat.types';

export const getChatsStart = () => ({
	type: ChatActionsTypes.GET_CHATS
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
