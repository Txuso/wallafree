import { createSelector } from 'reselect';

const selectCategories = state => state.category;

export const selectSections = createSelector(
	[selectCategories],
	category => category.categories
);
