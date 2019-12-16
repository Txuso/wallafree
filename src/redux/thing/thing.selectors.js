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

export const selectCategory = collectionUrlParam =>
	createSelector([selectAllThings], things =>
		things
			? things.filter(thing => thing.categoryId === collectionUrlParam)
			: []
	);
