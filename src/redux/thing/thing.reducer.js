import ThingActionsTypes from './thing.types';

const INITIAL_STATE = {
	things: [],
	isLoading: false,
	errorMessage: undefined
};

const thingReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ThingActionsTypes.GET_THINGS: {
			return {
				...state,
				isLoading: true
			};
		}
		case ThingActionsTypes.GET_THINGS_SUCCESS: {
			return {
				...state,
				isLoading: false,
				things: action.payload.collectionsMap
			};
		}
		case ThingActionsTypes.GET_THINGS_FAILURE: {
			return {
				...state,
				isLoading: false,
				errorMessage: action.payload.error
			};
		}
		case ThingActionsTypes.ADD_THING: {
			return {
				...state,
				isLoading: true
			};
		}
		case ThingActionsTypes.ADD_THING_SUCCESS: {
			return {
				...state,
				isLoading: false,
				things: [...state.things, action.payload.thing]
			};
		}
		default:
			return state;
	}
};

export default thingReducer;
