import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosApi } from '../../helpers/api';
import initialStates from './state';

// register
export const loginUser = createAsyncThunk('loginUser', async (data, { rejectWithValue }) => {
  try {
    const response = await axiosApi.post('/login', data, {
      headers: { 'content-type': 'application/x-www-form-urlencoded' }
    });
    if (response) {
      axiosApi.defaults.headers.common['x-access-token'] = response.data.body.token;
      localStorage.setItem('accessToken', response.data.body.token);
    }
    return response.data;
  } catch (error) {
    if (!error.response) {
      throw error;
    }
    return rejectWithValue(error.response.data);
  }
});

// create slice
const authSlice = createSlice({
  name: 'auth',
  initialState: initialStates,
  extraReducers: {
    [loginUser.pending]: (state, action) => {
      state.status = 'loading';
    },
    [loginUser.fulfilled]: (state, action) => {
      state.status = 'succeed';
      state.loginData = action.payload;
    },
    [loginUser.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    }
  },
  reducers: {
    // setAuth(state) {
    //   state.status = null;
    //   state.type = null;
    // },
  }
});

// export const { setAuth } = authSlice.actions;
const { reducer } = authSlice;
export default reducer;
