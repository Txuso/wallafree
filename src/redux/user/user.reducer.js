import UserActionTypes from './user.types';

const INITIAL_STATE = {
	currentUser: {
		displayName: '',
		description: '',
		imageUrl: '',
		userId: '',
		email: ''
	},
	error: null
};

const userReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case UserActionTypes.UPDATE_CURRENT_USER_INFO_SUCCESS:
			return {
				...state,
				currentUser: action.payload.user,
				error: null
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
				currentUser: INITIAL_STATE.currentUser,
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

		default:
			return state;
	}
};

export default userReducer;
