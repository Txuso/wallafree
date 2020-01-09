import ThingActionsTypes from './thing.types';

export const getThingsStart = () => ({
	type: ThingActionsTypes.GET_THINGS
});

export const getThingsSuccess = things => ({
	type: ThingActionsTypes.GET_THINGS_SUCCESS,
	payload: { things: things }
});

export const giveThingStart = (thingId, userId) => ({
	type: ThingActionsTypes.GIVE_THING,
	payload: { thingId: thingId, userId: userId }
});

export const giveThingSuccess = (thingId, userId) => ({
	type: ThingActionsTypes.GIVE_THING_SUCCESS,
	payload: { thingId: thingId }
});

export const giveThingsFailure = error => ({
	type: ThingActionsTypes.GIVE_THING_FAILURE,
	payload: { error: error }
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
