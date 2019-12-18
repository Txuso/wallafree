import { createSelector } from 'reselect';

const selectChat = state => state.chat;

export const selectAllChatMessages = createSelector(
	[selectChat],
	chat => chat.chats
);

export const selectCurrentThingMessages = collectionUrlParam =>
	createSelector([selectAllChatMessages], chats =>
		chats ? chats.filter(chat => console.log('chat a ver', chat)) : []
	);
