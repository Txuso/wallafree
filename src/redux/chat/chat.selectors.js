import { createSelector } from 'reselect';
import { selectCurrentUserId } from '../user/user.selector';

const selectChat = state => state.chat;

export const selectAllChatMessages = createSelector(
	[selectCurrentUserId, selectChat],
	(userId, chat) => chat.chats
);

export const selectCurrentChatMessages = createSelector(
	[selectCurrentUserId, selectChat],
	(userId, chat) => chat && chat.messages
);

// export const selectCurrentChatMessages = collectionUrlParam =>
// 	createSelector([selectAllChatMessages], chats => chats.messages);
