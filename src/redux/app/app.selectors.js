import { createSelector } from 'reselect';

const selectApp = (state) => state.app;

export const selectIsModalShown = createSelector([ selectApp ], (app) => app.isModalShown);

export const selectModalText = createSelector([ selectApp ], (app) => app.modalMessage);

export const selectAlertInfo = createSelector([ selectApp ], (app) => app.alertInfo);
