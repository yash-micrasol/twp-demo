import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosApi } from '../../helpers/api';
import initialStates from './state';

export const getDashboardData = createAsyncThunk(
  'getDashboardData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosApi.get('/dashboard');
      return response.data.body;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

// create slice
const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: initialStates,
  extraReducers: {
    [getDashboardData.pending]: (state, action) => {
      state.status = 'loading';
    },
    [getDashboardData.fulfilled]: (state, action) => {
      state.status = 'succeed';
      state.data = action.payload;
    },
    [getDashboardData.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    }
  }
});

const { reducer } = dashboardSlice;
export default reducer;
