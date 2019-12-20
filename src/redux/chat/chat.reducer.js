import ChatActionsTypes from './chat.types';

const INITIAL_STATE = {
	chats: [],
	isLoading: false,
	errorMessage: undefined
};

const chatReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ChatActionsTypes.GET_CHATS: {
			return {
				...state,
				isLoading: true
			};
		}
		case ChatActionsTypes.GET_CHATS_SUCCESS: {
			return {
				...state,
				isLoading: false,
				chats: action.payload.chats
			};
		}
		case ChatActionsTypes.GET_CHATS_FAILURE: {
			return {
				...state,
				isLoading: false,
				errorMessage: action.payload.error
			};
		}
		case ChatActionsTypes.CREATE_CHATS: {
			return {
				...state,
				isLoading: true
			};
		}
		case ChatActionsTypes.CREATE_CHATS_SUCCESS: {
			return {
				...state,
				isLoading: false,
				chats: [...state.chats, action.payload.chat]
			};
		}
		case ChatActionsTypes.SEND_MESSAGE_SUCCESS: {
			// create a deep copy of the chat object due to nested objects
			const newMessages = JSON.parse(JSON.stringify([...state.chats]));
			const index = newMessages.findIndex(
				chat => chat.id === action.payload.thingId
			);
			newMessages[index].messages = [
				...newMessages[index].messages,
				action.payload.message
			];

			return {
				...state,
				isLoading: false,
				chats: newMessages
			};
		}
		case ChatActionsTypes.CREATE_CHATS_FAILURE: {
			return {
				...state,
				isLoading: false,
				errorMessage: action.payload.error
			};
		}
		default:
			return state;
	}
};

export default chatReducer;
