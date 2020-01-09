import AppActionsTypes from './app.types';

export const changeModalVisibility = (isModalShown, modalMessage) => ({
	type: AppActionsTypes.CHANGE_MODAL_VISIBILITY,
	payload: { isModalShown: isModalShown, modalMessage: modalMessage }
});
