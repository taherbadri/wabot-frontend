import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { customFetch } from '@/lib/utils';
import { toast } from 'sonner';
const initialState = {
	users: [],
	isLoading: false,
	error: null,
	userData: null,
};

export const fetchUserDetails = createAsyncThunk(
	'user/fetchUserDetails',
	async (userId, thunkAPI) => {
		try {
			const { data } = await customFetch('/users/user-details', {
				params: {
					id: userId,
				},
			});
			return data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data.message);
		}
	}
);

export const createUser = createAsyncThunk(
	'user/createUser',
	async (userDetails, thunkAPI) => {
		try {
			const { data } = await customFetch.post('/users/create-user', {
				...userDetails,
			});
			return data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data.message);
		}
	}
);

export const fetchUsers = createAsyncThunk(
	'user/fetchUsers',
	async (type, thunkAPI) => {
		const endPoint =
			type === 'users'
				? 'list-users'
				: type === 'admins'
				? 'list-admins'
				: 'list-users';
		try {
			const { data } = await customFetch(`/users/${endPoint}`);
			return data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data.message);
		}
	}
);

export const userActions = createAsyncThunk(
	'user/userActions',
	async (actionWithUserDetails, thunkAPI) => {
		const { action, details, actionId, filter } = actionWithUserDetails;
		let actionEndPoint = '';
		let postData = null;
		switch (action) {
			case 'activate':
				actionEndPoint = 'reject-donation';
				postData = { ids: [...details] };
				break;
			case 'delete':
				actionEndPoint = 'delete-user';
				postData = { ids: [...details] };
				break;
			case 'update-status':
				actionEndPoint = 'update-status';
				postData = { ids: [...details], status: actionId };
				break;
			case 'update-permissions':
				actionEndPoint = 'update-permissions';
				postData = { ids: [...details], permission_id: actionId };
				break;
			case 'update-type':
				actionEndPoint = 'update-type';
				postData = { ids: [...details], type: actionId };
				break;
			case 'assign-role':
				actionEndPoint = 'assign-role';
				postData = { ids: [...details], role_id: actionId };
				break;
			default:
				actionEndPoint = 'approve-donation';
				postData = { ids: [...details] };
				// by default it will approve donation
				break;
		}
		try {
			const { data } = await customFetch.post(`/users/${actionEndPoint}`, {
				...postData,
			});
			if (data?.status === 'success') {
				thunkAPI.dispatch(fetchUsers(filter));
			}
			return data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data.message);
		}
	}
);

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		addUser: (state, action) => {
			state.users.push(action.payload);
		},
		removeUser: (state, action) => {
			state.users = state.users.filter((user) => user.id !== action.payload.id);
		},
		setLoading: (state, action) => {
			state.isLoading = action.payload;
		},
		setError: (state, action) => {
			state.error = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchUsers.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(fetchUsers.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.users = payload.data.list;
			})
			.addCase(fetchUsers.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})
			.addCase(createUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createUser.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				toast.success(payload.message);
			})
			.addCase(createUser.rejected, (state, { payload }) => {
				const errorMessages =
					typeof payload === 'string'
						? payload
						: Object.keys(payload)
								.map((key) => `${key}: ${payload[key]}`)
								.join(', ');

				toast.error(errorMessages);
			})
			.addCase(userActions.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(userActions.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				toast.success(payload.message);
			})
			.addCase(userActions.rejected, (state, { payload }) => {
				state.isLoading = false;
				toast.error(payload);
			})
			.addCase(fetchUserDetails.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(fetchUserDetails.fulfilled, (state, { payload }) => {
				(state.isLoading = false), (state.userData = payload.data);
			})
			.addCase(fetchUserDetails.rejected, (state, { payload }) => {
				state.isLoading = false;
				toast.error(payload);
			});
	},
});

export const { addUser, removeUser, setLoading, setError } = userSlice.actions;
export default userSlice.reducer;
