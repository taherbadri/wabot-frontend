import { configureStore } from '@reduxjs/toolkit';
import authenticationReducer from './features/authentication/authenticationSlice';
import widgetsReducer from './features/widgets/widgetsSlice';
import userReducer from './features/user/userSlice';
import whatsappReducer from './features/whatsapp/whatsappSlice';
export const makeStore = () => {
	return configureStore({
		reducer: {
			authentication: authenticationReducer,
			widgets: widgetsReducer,
			user: userReducer,
			whatsapp: whatsappReducer,
		},
	});
};
