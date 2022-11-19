import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosApi } from '../../helpers/api';
import initialStates from './state';

export const getAnalytics = createAsyncThunk('getAnalytics', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosApi.get('/analytics');
    return response.data.body.current_analysis;
  } catch (error) {
    if (!error.response) {
      throw error;
    }
    return rejectWithValue(error.response.data);
  }
});

// create slice
const salesSlice = createSlice({
  name: 'sales',
  initialState: initialStates,
  extraReducers: {
    [getAnalytics.pending]: (state, action) => {
      state.status = 'loading';
    },
    [getAnalytics.fulfilled]: (state, action) => {
      state.status = 'succeed';
      state.data = action.payload;
    },
    [getAnalytics.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    }
  }
});

const { reducer } = salesSlice;
export default reducer;
