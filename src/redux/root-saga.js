import { all, call } from 'redux-saga/effects';

import { chatSagas } from './chat/chat.sagas';
import { thingSagas } from './thing/thing.sagas';
import { userSagas } from './user/user.sagas';

export default function* rootSaga() {
	yield all([call(userSagas), call(thingSagas), call(chatSagas)]);
}
