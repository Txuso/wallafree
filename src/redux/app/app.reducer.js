import AppActionsTypes from './app.types';

const INITIAL_STATE = {
	isModalShown: false,
	modalMessage: ''
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
		default:
			return state;
	}
};

export default appReducer;
