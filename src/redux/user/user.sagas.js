import {
	addFilesToStorage,
	auth,
	createUserProfileDocument,
	getCurrentUser,
	googleProvider,
	updateDocuments
} from '../../common/utils/firebase.utils';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
	signInFailure,
	signInSuccess,
	signOutFailure,
	signOutSuccess,
	signUpFailure,
	signUpSuccess,
	updateUserInfoError,
	updateUserInfoSuccess
} from './user.actions';

import UserActionTypes from './user.types';

export function* getSnapshotFromUserAuth(userAuth, additionalData) {
	try {
		const userRef = yield call(createUserProfileDocument, userAuth, additionalData);
		const userSnapshot = yield userRef.get();
		localStorage.setItem('userId', userSnapshot.id);
		yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
	} catch (error) {
		yield put(signInFailure(error));
	}
}
export function* signInWithGoogle() {
	try {
		const { user } = yield auth.signInWithPopup(googleProvider);
		yield getSnapshotFromUserAuth(user);
	} catch (error) {
		yield put(signInFailure(error));
	}
}

export function* onGoogleSignInStart() {
	yield takeLatest(UserActionTypes.GOOGLE_SING_IN_START, signInWithGoogle);
}

export function* signInWithEmail({ payload: { email, password } }) {
	try {
		const { user } = yield auth.signInWithEmailAndPassword(email, password);
		yield getSnapshotFromUserAuth(user);
	} catch (error) {
		yield put(signInFailure(error));
	}
}

export function* onEmailSignInStart() {
	yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* isUserAuthenticated() {
	try {
		const userAuth = yield getCurrentUser();
		if (!userAuth) return;
		yield getSnapshotFromUserAuth(userAuth);
	} catch (error) {
		yield put(signInFailure(error));
	}
}

export function* onCheckUserSession() {
	yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* signOut() {
	try {
		yield auth.signOut();
		yield put(signOutSuccess());
	} catch (error) {
		yield put(signOutFailure(error));
	}
}

export function* onSignOutStart() {
	yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

export function* signUp({ payload: { email, password, displayName } }) {
	try {
		const { user } = yield auth.createUserWithEmailAndPassword(email, password);
		yield put(signUpSuccess({ user, additionalData: { displayName } }));
	} catch (error) {
		yield put(signUpFailure(error));
	}
}

export function* onSignUpStart() {
	yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
}

export function* signInAfterSignUp({ payload: { user, additionalData } }) {
	yield getSnapshotFromUserAuth(user, additionalData);
}

export function* onSignUpSuccess() {
	yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* updateCurrentUserInfo(action) {
	try {
		const imageToProcess = action.payload.user && action.payload.user.newImagzeToProcess;

		const { user } = action.payload;

		if (imageToProcess) {
			const imageUrl = yield addFilesToStorage({
				name: user.displayName,
				imageToProcess
			});

			user.imageUrl = imageUrl;
		}
		const info = 'Your profile has been updated correctly';
		delete user.newImageToProcess;
		yield call(updateDocuments, 'users', user);
		yield put(updateUserInfoSuccess(user, info));
	} catch (error) {
		yield put(updateUserInfoError(error));
	}
}

export function* onUpdateUserInfo() {
	yield takeLatest(UserActionTypes.UPDATE_CURRENT_USER_INFO, updateCurrentUserInfo);
}

export function* userSagas() {
	yield all([
		call(onUpdateUserInfo),
		call(onGoogleSignInStart),
		call(onEmailSignInStart),
		call(onCheckUserSession),
		call(onSignOutStart),
		call(onSignUpStart),
		call(onSignUpSuccess)
	]);
}
