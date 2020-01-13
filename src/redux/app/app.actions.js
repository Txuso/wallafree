import AppActionsTypes from './app.types';

export const changeModalVisibility = (isModalShown, modalMessage) => ({
	type: AppActionsTypes.CHANGE_MODAL_VISIBILITY,
	payload: { isModalShown: isModalShown, modalMessage: modalMessage }
});

export const resetAletInfo = () => ({
	type: AppActionsTypes.RESET_ALERT_INFO
});
