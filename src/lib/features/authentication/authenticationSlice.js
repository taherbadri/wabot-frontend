import { customFetch } from '@/lib/utils';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'sonner';

const initialState = {
	isAuthenticated: false,
	isLoading: false,
	isEnterOTP: false,
	contact_number: '',
	user: null,
	isLoggedOut: false,
};

export const resendOTP = createAsyncThunk(
	'authentication/resendOTP',
	async (phoneNumber, thunkAPI) => {
		try {
			const { data } = await customFetch.post(
				'/auth/resend-otp',
				{ contact_number: phoneNumber },
				{ withCredentials: true }
			);
			return data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data.message);
		}
	}
);

export const signupUser = createAsyncThunk(
	'authentication/signupUser',
	async (user, thunkAPI) => {
		try {
			const { data } = await customFetch.post('/auth/signup', { ...user });
			return data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data.message);
		}
	}
);

export const showMe = createAsyncThunk(
	'authentication/showMe',
	async (_, thunkAPI) => {
		try {
			const { data } = await customFetch.get('/auth/show-user');
			return data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data.message);
		}
	}
);

export const loginUser = createAsyncThunk(
	'authentication/loginUser',
	async (user, thunkAPI) => {
		try {
			const { data } = await customFetch.post('/auth/login', { ...user });
			return data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data.message);
		}
	}
);
export const logoutUser = createAsyncThunk(
	'authentication/logoutUser',
	async (_, thunkAPI) => {
		try {
			const { data } = await customFetch.delete('/auth/logout');
			return data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data.message);
		}
	}
);

export const verifyOTP = createAsyncThunk(
	'authentication/verifyOTP',
	async (user, thunkAPI) => {
		try {
			const { data } = await customFetch.post('/auth/verify-otp', { ...user });
			return data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data.message);
		}
	}
);

const authenticationSlice = createSlice({
	name: 'authentication',
	initialState,
	reducers: {
		setPhoneNumber: (state, { payload }) => {
			state.contact_number = payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(signupUser.pending, (state, { payload }) => {
				state.isLoading = true;
			})
			.addCase(signupUser.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				toast.success(payload.message);
			})
			.addCase(signupUser.rejected, (state, { payload }) => {
				state.isLoading = false;
				state.isEnterOTP = false;
				state.isAuthenticated = false;
				toast.error(payload);
			})
			.addCase(loginUser.pending, (state, { payload }) => {
				state.isLoading = true;
			})
			.addCase(loginUser.fulfilled, (state, { payload }) => {
				console.log(
					`file: authenticationSlice.js:116 - .addCase - payload:`,
					payload.data
				);
				state.isLoading = false;
				// state.isEnterOTP = true;
				state.user = payload.data;
				state.isAuthenticated = true;
				state.isLoggedOut = false;
				toast.success(payload.message || 'Login Successful');
			})
			.addCase(loginUser.rejected, (state, { payload }) => {
				state.isLoading = false;
				state.isEnterOTP = false;
				state.isAuthenticated = false;
				toast.error(payload);
			})
			.addCase(logoutUser.pending, (state, { payload }) => {
				state.isLoading = true;
			})
			.addCase(logoutUser.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.isLoggedOut = true;
				state.isAuthenticated = false;
				state.user = null;
				toast.success(payload.message || 'Logged out successfully');
			})
			.addCase(logoutUser.rejected, (state, { payload }) => {
				state.isLoading = false;
				toast.error(payload);
			})
			.addCase(verifyOTP.pending, (state, { payload }) => {
				state.isLoading = true;
			})
			.addCase(verifyOTP.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.isEnterOTP = false;
				state.user = payload.user;
				state.isAuthenticated = true;
				state.isLoggedOut = false;
				toast.success(payload.message || 'Login Successful');
			})
			.addCase(verifyOTP.rejected, (state, { payload }) => {
				state.isLoading = false;
				state.isAuthenticated = false;
				toast.error(payload);
			})
			.addCase(showMe.pending, (state, { payload }) => {
				state.isLoading = true;
			})
			.addCase(showMe.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.isEnterOTP = false;
				state.user = payload.data;
				state.isLoggedOut = false;
				state.isAuthenticated = true;
			})
			.addCase(showMe.rejected, (state, { payload }) => {
				state.isLoading = false;
				state.isAuthenticated = false;
				state.isLoggedOut = true;
			});
	},
});

export const { setPhoneNumber } = authenticationSlice.actions;
export default authenticationSlice.reducer;
