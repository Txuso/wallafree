import { createSelector } from 'reselect';

const selectThings = state => state.thing;

export const selectAllThings = createSelector(
	[selectThings],
	thing => thing.things
);

export const selectIsThingLoading = createSelector(
	[selectThings],
	thing => thing.isLoading
);
