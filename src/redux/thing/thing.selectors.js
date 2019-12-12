import { createSelector } from 'reselect';

const selectThings = state => state.thing;

export const selectThingCollection = createSelector(
	[selectThings],
	thing => thing.things
);
