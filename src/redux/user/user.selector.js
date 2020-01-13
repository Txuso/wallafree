import { createSelector } from 'reselect';

const selectUser = (state) => state.user;

export const selectCurrentUser = createSelector([ selectUser ], (user) => user && user.currentUser);

export const selectCurrentUserId = createSelector(
	[ selectCurrentUser ],
	(currentUser) => currentUser && currentUser.id
);

export const selectLoginError = createSelector([ selectUser ], (user) => user.error);
