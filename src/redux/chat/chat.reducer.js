import ChatActionsTypes from './chat.types';
import ThingActionsTypes from '../thing/thing.types';

const INITIAL_STATE = {
	chats: [],
	messages: [],
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
		case ChatActionsTypes.GET_CHAT_MESSAGES: {
			return {
				...state,
				isLoading: true
			};
		}
		case ChatActionsTypes.GET_CHAT_MESSAGES_SUCCESS: {
			return {
				...state,
				isLoading: false,
				messages: action.payload.messages.sort(
					(a, b) => a.timestamp - b.timestamp
				)
			};
		}
		case ChatActionsTypes.GET_CHAT_MESSAGES_FAILURE: {
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

		case ChatActionsTypes.CREATE_CHATS_FAILURE: {
			return {
				...state,
				isLoading: false,
				errorMessage: action.payload.error
			};
		}

		case ThingActionsTypes.GIVE_THING_SUCCESS: {
			const filteredChats = state.chats.filter(
				chat => chat.thingId !== action.payload.thingId
			);

			return {
				...state,
				chats: filteredChats,
				messages: []
			};
		}
		default:
			return state;
	}
};

export default chatReducer;
