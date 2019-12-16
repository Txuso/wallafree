import UserActionTypes from './user.types';

const INITIAL_STATE = {
	currentUser: {
		displayName: '',
		description: '',
		imageUrl: '',
		userId: '',
		email: ''
	},
	error: null,
	info: null
};

const userReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case UserActionTypes.UPDATE_CURRENT_USER_INFO_SUCCESS:
			return {
				...state,
				currentUser: action.payload.user,
				error: null,
				info: action.payload.info
			};
		case UserActionTypes.SING_IN_SUCCESS:
			return {
				...state,
				currentUser: action.payload.user,
				error: null
			};
		case UserActionTypes.SIGN_OUT_SUCCESS:
			return {
				...state,
				currentUser: null,
				error: null
			};
		case UserActionTypes.UPDATE_CURRENT_USER_INFO_FAILURE:
		case UserActionTypes.SIGN_OUT_FAILURE:
		case UserActionTypes.SIGN_UP_FAILURE:
		case UserActionTypes.SING_IN_FAILURE:
			return {
				...state,
				error: action.payload.error
			};
		case UserActionTypes.RESET_ERROR:
			return {
				...state,
				error: null
			};

		case UserActionTypes.RESET_INFO:
			return {
				...state,
				info: null
			};
		default:
			return state;
	}
};

export default userReducer;
