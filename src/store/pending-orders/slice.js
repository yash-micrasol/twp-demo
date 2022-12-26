import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosApi } from "../../helpers/api";
import initialStates from "./state";

let cancelToken;

export const getPendingOrder = createAsyncThunk(
  "getPendingOrder",
  async (data, { rejectWithValue }) => {
    try {
      //Check if there are any previous pending requests
      if (typeof cancelToken != typeof undefined) {
        cancelToken.cancel("Operation canceled due to new request.");
      }

      //Save the cancel token for the current request
      cancelToken = axios.CancelToken.source();
      const response = await axiosApi.post(
        "/pending-order-list",
        {
          ...data,
        },
        { cancelToken: cancelToken.token }
      );

      return {
        response: response?.data?.body ?? [],
        page: data?.page ?? 1,
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

export const getPendingOrderDetails = createAsyncThunk(
  "getPendingOrderDetails",
  async ({ invoice_number }, { rejectWithValue }) => {
    try {
      const response = await axiosApi.post("/pending-order-items-list", {
        invoice_number,
      });
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
const pendingOrderSlice = createSlice({
  name: "pendingOrder",
  initialState: initialStates,
  extraReducers: {
    [getPendingOrder.pending]: (state, action) => {
      state.status = "loading";
    },
    [getPendingOrder.fulfilled]: (state, action) => {
      state.status = action.payload.state ? "loading" : "succeed";
      state.order =
        action.payload.page === 1
          ? action.payload.response
          : {
              ...state.order,
              ...action.payload.response,
              data: [
                ...(state.order?.data ?? []),
                ...(action.payload?.response?.data ?? []),
              ],
            };
    },
    [getPendingOrder.rejected]: (state, action) => {
      state.status = "failed";
      state.order = [];
      state.error = action.payload;
    },
    [getPendingOrderDetails.pending]: (state, action) => {
      state.status = "loading";
    },
    [getPendingOrderDetails.fulfilled]: (state, action) => {
      state.status = "succeed";
      state.orderDetails = action.payload;
    },
    [getPendingOrderDetails.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

const { reducer } = pendingOrderSlice;
export default reducer;
