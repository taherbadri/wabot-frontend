import {
	customFetch,
	formatDonationTypeData,
	transformChartData,
} from '@/lib/utils';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
	isLoading: false,
	totalDonationCounts: null,
	donationFrequencyData: [],
	donationTypeData: null,
	donationCategories: [],
	donationStatuses: [],
	donationsByVolunteer: [],
	donationsByuser: [],
	volunteerStats: null,
	userDonationTypes: null,
	error: null,
};

export const donationCountsByType = createAsyncThunk(
	'widgets/donationCountsByType',
	async (type, thunkAPI) => {
		try {
			const { data } = await customFetch('/widgets/donation-counts-by-type');
			const finalData = formatDonationTypeData(data);
			return finalData;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data.message);
		}
	}
);

export const donationCountsByCategory = createAsyncThunk(
	'widgets/donationCountsByCategory',
	async (_, thunkAPI) => {
		try {
			const { data } = await customFetch(
				'/widgets/donation-counts-by-category'
			);
			return data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data.message);
		}
	}
);

export const donationCountsByStatus = createAsyncThunk(
	'widgets/donationCountByStatus',
	async (_, thunkAPI) => {
		try {
			const { data } = await customFetch('/widgets/donation-counts-by-status');
			return data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data.message);
		}
	}
);

export const donationCounts = createAsyncThunk(
	'widgets/donationCounts',
	async (_, thunkAPI) => {
		try {
			const { data } = await customFetch('/widgets/donation-counts');
			return data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data.message);
		}
	}
);

export const donationCountsByTime = createAsyncThunk(
	'widgets/donationCountByTime',
	async (frequency, thunkAPI) => {
		try {
			const { data } = await customFetch('/widgets/donation-counts-by-time', {
				params: {
					type: frequency,
				},
			});
			const transformedData = transformChartData(data, frequency);
			return transformedData;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data.message);
		}
	}
);

export const donationCountsByVolunteer = createAsyncThunk(
	'widgets/getDonationCountsByVolunteer',
	async (_, thunkAPI) => {
		try {
			const { data } = await customFetch(
				'/widgets/donation-counts-by-volunteer'
			);
			return data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data);
		}
	}
);

export const donationCountsByusers = createAsyncThunk(
	'widgets/getDonationCountsByusers',
	async (_, thunkAPI) => {
		try {
			const { data } = await customFetch('/widgets/donation-counts-by-users');
			return data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data);
		}
	}
);

export const volunteerCounts = createAsyncThunk(
	'widgets/getVolunteerCounts',
	async (_, thunkAPI) => {
		try {
			const { data } = await customFetch('/widgets/volunteer-counts');
			return data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data);
		}
	}
);

export const userDonationCountsByType = createAsyncThunk(
	'widgets/getuserDonationCountsByType',
	async (_, thunkAPI) => {
		try {
			const { data } = await customFetch(
				'/widgets/user/donation-counts-by-type'
			);
			return data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data);
		}
	}
);

const widgetsSLice = createSlice({
	name: 'widgets',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(donationCounts.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(donationCounts.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.totalDonationCounts = payload;
			})
			.addCase(donationCounts.rejected, (state, { payload }) => {
				state.isLoading = false;
			})
			.addCase(donationCountsByTime.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(donationCountsByTime.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.donationFrequencyData = payload;
			})
			.addCase(donationCountsByTime.rejected, (state, { payload }) => {
				state.isLoading = false;
			})
			.addCase(donationCountsByCategory.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(donationCountsByCategory.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.donationCategories = payload;
			})
			.addCase(donationCountsByCategory.rejected, (state, { payload }) => {
				state.isLoading = false;
			})
			.addCase(donationCountsByStatus.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(donationCountsByStatus.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.donationStatuses = payload;
			})
			.addCase(donationCountsByStatus.rejected, (state, { payload }) => {
				state.isLoading = false;
			})
			.addCase(donationCountsByType.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(donationCountsByType.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.donationTypeData = payload;
			})
			.addCase(donationCountsByType.rejected, (state, { payload }) => {
				state.isLoading = false;
			})
			.addCase(donationCountsByVolunteer.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(donationCountsByVolunteer.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.donationsByVolunteer = payload;
			})
			.addCase(donationCountsByVolunteer.rejected, (state, { payload }) => {
				state.isLoading = false;
				state.error = payload;
			})

			.addCase(donationCountsByusers.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(donationCountsByusers.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.donationsByuser = payload;
			})
			.addCase(donationCountsByusers.rejected, (state, { payload }) => {
				state.isLoading = false;
				state.error = payload;
			})

			.addCase(volunteerCounts.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(volunteerCounts.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.volunteerStats = payload;
			})
			.addCase(volunteerCounts.rejected, (state, { payload }) => {
				state.isLoading = false;
				state.error = payload;
			})

			.addCase(userDonationCountsByType.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(userDonationCountsByType.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.userDonationTypes = payload;
			})
			.addCase(userDonationCountsByType.rejected, (state, { payload }) => {
				state.isLoading = false;
				state.error = payload;
			});
	},
});

export const {} = widgetsSLice.actions;
export default widgetsSLice.reducer;
