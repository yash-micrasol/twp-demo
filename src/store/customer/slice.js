import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { axiosApi } from '../../helpers/api';
import initialStates from './state';

let cancelToken;

export const searchCustomer = createAsyncThunk(
  'searchCustomer',
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
          type: 'customer',
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

export const customerList = createAsyncThunk(
  'customerList',
  async ({ page }, { rejectWithValue }) => {
    try {
      const response = await axiosApi.get(`/customer?page=${page}`);
      return { response: response.data.body, page };
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const customerDetails = createAsyncThunk(
  'customerDetails',
  async ({ customer_id }, { rejectWithValue }) => {
    try {
      const response = await axiosApi.post(`/customer-history`, {
        customer_id
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

export const invoiceDetails = createAsyncThunk(
  'invoiceDetails',
  async ({ customer_id, items, page }, { rejectWithValue }) => {
    try {
      const response = await axiosApi.post(`/customer-invoice-details`, {
        customer_id,
        items,
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

export const newOrder = createAsyncThunk('newOrder', async (data, { rejectWithValue }) => {
  try {
    const response = await axiosApi.post(`/order`, {
      ...data
    });
    return response.data;
  } catch (error) {
    if (!error.response) {
      throw error;
    }
    return rejectWithValue(error.response.data);
  }
});

// create slice
const customerSlice = createSlice({
  name: 'customer',
  initialState: initialStates,
  extraReducers: {
    [searchCustomer.pending]: (state, action) => {
      state.status = 'loading';
    },
    [searchCustomer.fulfilled]: (state, action) => {
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
    [searchCustomer.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    [customerList.pending]: (state, action) => {
      state.status = 'loading';
    },
    [customerList.fulfilled]: (state, action) => {
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
    [customerList.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    [customerDetails.pending]: (state, action) => {
      state.status = 'loading';
    },
    [customerDetails.fulfilled]: (state, action) => {
      state.status = 'succeed';
      state.customer = action.payload?.customer_details ?? null;
      state.invoice = action.payload?.invoice_detials ?? [];
    },
    [customerDetails.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    [invoiceDetails.pending]: (state, action) => {
      state.status = 'loading';
    },
    [invoiceDetails.fulfilled]: (state, action) => {
      state.status = 'succeed';
      state.invData =
        action.payload.page === 1
          ? action.payload.response
          : {
              ...state.invData,
              invoice_details: {
                ...state.invData.invoice_details,
                data: [
                  ...(state.invData?.invoice_details?.data ?? []),
                  ...(action.payload?.response?.invoice_details?.data ?? [])
                ]
              }
            };
    },
    [invoiceDetails.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    [newOrder.pending]: (state, action) => {
      state.status = 'loading';
    },
    [newOrder.fulfilled]: (state, action) => {
      state.status = 'succeed';
      state.newOrderData = action.payload;
    },
    [newOrder.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    }
  },
  reducers: {
    setInvoice(state, action) {
      state.invoice = action.payload;
    },
    setOrder(state, action) {
      state.order = action.payload;
    },
    setCustomerData(state, action) {
      state.customerData = action.payload;
    }
  }
});

export const { setInvoice, setOrder, setCustomerData } = customerSlice.actions;
const { reducer } = customerSlice;
export default reducer;
