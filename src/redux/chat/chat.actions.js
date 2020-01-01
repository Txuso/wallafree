import ChatActionsTypes from './chat.types';

export const getChatsStart = userId => ({
	type: ChatActionsTypes.GET_CHATS,
	payload: { userId: userId }
});

export const getChatMessages = chatId => ({
	type: ChatActionsTypes.GET_CHAT_MESSAGES,
	payload: { chatId: chatId }
});

export const getChatMessagesSuccess = messages => ({
	type: ChatActionsTypes.GET_CHAT_MESSAGES_SUCCESS,
	payload: { messages: messages }
});

export const getChatMessagesFailure = error => ({
	type: ChatActionsTypes.GET_CHAT_MESSAGES_FAILURE,
	payload: { error: error }
});

export const getChatsSuccess = chats => ({
	type: ChatActionsTypes.GET_CHATS_SUCCESS,
	payload: { chats: chats }
});

export const getChatsFailure = error => ({
	type: ChatActionsTypes.GET_CHATS_FAILURE,
	payload: { error: error }
});

export const createChatStart = (currentUserId, thingId, userId) => ({
	type: ChatActionsTypes.CREATE_CHAT,
	payload: { ownerId: userId, thingId: thingId, requestUserId: currentUserId }
});

export const createChatSuccess = chat => ({
	type: ChatActionsTypes.CREATE_CHAT_SUCCESS,
	payload: { chat: chat }
});

export const createChatFailure = error => ({
	type: ChatActionsTypes.CREATE_CHAT_FAILURE,
	payload: { error: error }
});

export const sendMessage = (message, userId, id) => ({
	type: ChatActionsTypes.SEND_MESSAGE,
	payload: { message: message, chatId: id, userId: userId }
});

export const sendMessageSuccess = (message, thingId) => ({
	type: ChatActionsTypes.SEND_MESSAGE_SUCCESS,
	payload: { message: message }
});

export const sendMessageFailure = error => ({
	type: ChatActionsTypes.SEND_MESSAGE_FAILURE,
	payload: { error: error }
});
