import categoryReducer from './categories/categories.reducer';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thingReducer from './thing/thing.reducer';
import userReducer from './user/user.reducer';

const persistConfig = {
	key: 'root',
	storage,
	whitelist: []
};

const rootReducer = combineReducers({
	user: userReducer,
	category: categoryReducer,
	thing: thingReducer
});
export default persistReducer(persistConfig, rootReducer);
