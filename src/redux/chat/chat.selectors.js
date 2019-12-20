import { createSelector } from 'reselect';
import { selectCurrentUserId } from '../user/user.selector';

const selectChat = state => state.chat;

export const selectAllChatMessages = createSelector(
	[selectCurrentUserId, selectChat],
	(userId, chat) =>
		chat.chats.filter(chat => {
			// TODO: test which messages should be displayed
			const creatorId = chat.userId;
			if (chat.userId === userId) {
				return chat;
			}

			chat.messages = chat.messages.filter(
				message =>
					message.userId === userId || creatorId === message.userId
			);
			if (chat.messages.length > 0) {
				return chat;
			}
		})
);

export const selectCurrentThingChat = collectionUrlParam =>
	createSelector([selectAllChatMessages], chats =>
		collectionUrlParam
			? chats.find(chat => chat.id === collectionUrlParam)
			: null
	);
