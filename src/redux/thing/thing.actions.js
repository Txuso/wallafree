import ThingActionsTypes from './thing.types';

export const getThingsStart = () => ({
	type: ThingActionsTypes.GET_THINGS
});

export const getThingsSuccess = things => ({
	type: ThingActionsTypes.GET_THINGS_SUCCESS,
	payload: { things: things }
});

export const getThingsFailure = error => ({
	type: ThingActionsTypes.GET_THINGS_FAILURE,
	payload: { error: error }
});

export const addThingStart = thing => ({
	type: ThingActionsTypes.ADD_THING,
	payload: { thing: thing }
});

export const addThingSuccess = thing => ({
	type: ThingActionsTypes.ADD_THING_SUCCESS,
	payload: { thing: thing }
});

export const addThingFailure = error => ({
	type: ThingActionsTypes.ADD_THING_FAILURE,
	payload: { error: error }
});
