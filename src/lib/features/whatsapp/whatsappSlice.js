import { customFetch } from '@/lib/utils';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'sonner';

const initialState = {
	isLoading: false,
	whatsappLink: null,
	error: null,
	connections: [],
	qrImage: '',
};

export const fetchWhatsappQr = createAsyncThunk(
	'whatsapp/fetchWhatsappQr',
	async (number, thunkAPI) => {
		try {
			const { data } = await customFetch.post('/whatsapp/init', {
				whatsapp_number: number,
			});
			return data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data.message);
		}
	}
);

export const checkConnectionStatus = createAsyncThunk(
	'whatsapp/checkConnectionStatus',
	async (_, thunkAPI) => {
		try {
			const { data } = await customFetch('/whatsapp/connection-status');
			return data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data.message);
		}
	}
);

export const sendMessage = createAsyncThunk(
	'whatsapp/sendMessage',
	async (message, thunkAPI) => {
		try {
			const { data } = await customFetch.post('/whatsapp/send-message', {
				...message,
			});
			return data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data.message);
		}
	}
);

export const uploadExcel = createAsyncThunk(
	'whatsapp/uploadExcel',
	async (file, thunkAPI) => {
		try {
			const { data } = await customFetch.post(
				'/upload',
				{
					...file,
				},
				{
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				}
			);
			return data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data.message);
		}
	}
);

export const destroySession = createAsyncThunk(
	'whatsapp/destroySession',
	async (number, thunkAPI) => {
		try {
			const { data } = await customFetch.post('/whatsapp/destroy', {
				whatsapp_number: number,
			});
			if (data.success) {
				thunkAPI.dispatch(checkConnectionStatus());
			}
			return data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data.message);
		}
	}
);

const whatsappSlice = createSlice({
	name: 'whatsapp',
	initialState,
	reducers: {
		clearQr: (state) => {
			state.qrImage = '';
			state.isLoading = false;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchWhatsappQr.pending, (state, { payload }) => {
				state.isLoading = true;
			})
			.addCase(fetchWhatsappQr.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.qrImage = payload.data;
			})
			.addCase(fetchWhatsappQr.rejected, (state, { payload }) => {
				state.isLoading = false;
				state.error = payload;
			})
			.addCase(checkConnectionStatus.pending, (state, { payload }) => {
				state.isLoading = true;
			})
			.addCase(checkConnectionStatus.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.connections = payload.data.connectionData;
				// toast.success(payload.message);
			})
			.addCase(checkConnectionStatus.rejected, (state, { payload }) => {
				state.isLoading = false;
				toast.error(payload);
			})
			.addCase(destroySession.pending, (state, { payload }) => {
				state.isLoading = true;
			})
			.addCase(destroySession.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				toast.success(payload.message);
			})
			.addCase(destroySession.rejected, (state, { payload }) => {
				state.isLoading = false;
				toast.error(payload);
			})
			.addCase(sendMessage.pending, (state, { payload }) => {
				state.isLoading = true;
			})
			.addCase(sendMessage.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				toast.success(payload.message);
			})
			.addCase(sendMessage.rejected, (state, { payload }) => {
				state.isLoading = false;
				toast.error(payload);
			})
			.addCase(uploadExcel.pending, (state, { payload }) => {
				state.isLoading = true;
			})
			.addCase(uploadExcel.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				toast.success(payload.message);
			})
			.addCase(uploadExcel.rejected, (state, { payload }) => {
				state.isLoading = false;
				toast.error(payload);
			});
	},
});

export const {} = whatsappSlice.actions;

export default whatsappSlice.reducer;
