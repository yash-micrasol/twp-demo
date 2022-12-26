import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { axiosApi } from '../../helpers/api';
import initialStates from './state';

let cancelToken;

export const searchItems = createAsyncThunk(
  'searchItems',
  async ({ search, page }, { rejectWithValue }) => {
    try {
      //Check if there are any previous pending requests
      if (typeof cancelToken != typeof undefined) {
        cancelToken.cancel('Operation canceled due to new request.');
      }

      //Save the cancel token for the current request
      cancelToken = axios.CancelToken.source();
      const response = await axiosApi.post(
        '/search',
        {
          type: 'items',
          search,
          page
        },
        { cancelToken: cancelToken.token }
      );
      return {
        response: response?.data?.body ?? [],
        page,
        state: response?.code === "ERR_CANCELED",
      };
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const filterItems = createAsyncThunk(
  'filterItems',
  async ({ type, page }, { rejectWithValue }) => {
    try {
      const response = await axiosApi.post('/filter', {
        type,
        page
      });
      return { response: response.data.body, page };
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

// create slice
const itemsSlice = createSlice({
  name: 'items',
  initialState: initialStates,
  extraReducers: {
    [searchItems.pending]: (state, action) => {
      state.status = 'loading';
    },
    [searchItems.fulfilled]: (state, action) => {
      state.status = action.payload.state ? "loading" : "succeed";
      state.data =
        action.payload.page === 1
          ? action.payload.response
          : {
              ...state.data,
              ...action.payload.response,
              data: [...(state.data?.data ?? []), ...(action.payload?.response?.data ?? [])]
            };
    },
    [searchItems.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    [filterItems.pending]: (state, action) => {
      state.status = 'loading';
    },
    [filterItems.fulfilled]: (state, action) => {
      state.status = 'succeed';
      state.data =
        action.payload.page === 1
          ? action.payload.response
          : {
              ...state.data,
              ...action.payload.response,
              data: [...(state.data?.data ?? []), ...(action.payload?.response?.data ?? [])]
            };
    },
    [filterItems.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    }
  },
  reducers: {
    clear(state, action) {
      state.data = {};
    }
  }
});
export const { clear } = itemsSlice.actions;
const { reducer } = itemsSlice;
export default reducer;
