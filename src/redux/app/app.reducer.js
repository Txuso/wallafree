import AppActionsTypes from './app.types';
import ThingActionsTypes from '../thing/thing.types';
import UserActionTypes from '../user/user.types';

const INITIAL_STATE = {
	isModalShown: false,
	modalMessage: '',
	alertInfo: ''
};

const appReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case AppActionsTypes.CHANGE_MODAL_VISIBILITY: {
			return {
				...state,
				isModalShown: action.payload.isModalShown,
				modalMessage: action.payload.modalMessage
			};
		}
		case ThingActionsTypes.ADD_THING_SUCCESS: {
			return {
				...state,
				alertInfo: action.payload.alertInfo
			};
		}

		case AppActionsTypes.RESET_ALERT_INFO:
			return {
				...state,
				alertInfo: null
			};

		case UserActionTypes.UPDATE_CURRENT_USER_INFO_SUCCESS:
			return {
				...state,
				alertInfo: action.payload.info
			};

		default:
			return state;
	}
};

export default appReducer;
