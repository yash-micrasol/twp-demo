import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { axiosApi } from '../../helpers/api';
import initialStates from './state';

let cancelToken;

export const searchInvoice = createAsyncThunk(
  'searchInvoice',
  async ({ type, search, page }, { rejectWithValue }) => {
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
          type,
          search,
          page
        },
        { cancelToken: cancelToken.token }
      );
      return { response: response.data.body, page };
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const invoiceData = createAsyncThunk('invoiceData', async (data, { rejectWithValue }) => {
  try {
    const response = await axiosApi.post('/pendinginvoices', {
      ...data
    });
    return { response: response.data.body, page: data?.page };
  } catch (error) {
    if (!error.response) {
      throw error;
    }
    return rejectWithValue(error.response.data);
  }
});

export const invoiceDetail = createAsyncThunk(
  'invoiceDetail',
  async ({ invoice_number }, { rejectWithValue }) => {
    try {
      const response = await axiosApi.post('/pendinginvoices-items', {
        invoice_number
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

export const singleInvoiceData = createAsyncThunk(
  'singleInvoiceData',
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await axiosApi.post('/pendinginvoices-id', {
        pend_invo_id: id
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

export const getDeliveryPersonList = createAsyncThunk(
  'getDeliveryPersonList',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosApi.get('/delivery-person-list');
      return response.data.body;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const markDelivered = createAsyncThunk(
  'markDelivered',
  async ({ invoice_number }, { rejectWithValue }) => {
    try {
      const response = await axiosApi.post('/pendinginvoices-status-update', {
        type: 'invoices',
        invoice_number
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

export const getInvoiceItems = createAsyncThunk(
  'getInvoiceItems',
  async ({ type, page, invoice_number,search }, { rejectWithValue }) => {
    try {
      //Check if there are any previous pending requests
      if (typeof cancelToken != typeof undefined) {
        cancelToken.cancel('Operation canceled due to new request.');
      }

      //Save the cancel token for the current request
      cancelToken = axios.CancelToken.source();
      const response = await axiosApi.post(
        '/get-item-invoice',
        {
          type,
          invoice_number,
          page,
          search
        },
        { cancelToken: cancelToken.token }
      );
      return { response: response.data.body, page };
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const addInvoiceItems = createAsyncThunk(
  'addInvoiceItems',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosApi.post('/add-new-item-invoice', {
        ...data
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

export const editInvoiceItems = createAsyncThunk(
  'editInvoiceItems',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosApi.post('/edit-item-invoice', {
        ...data
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

export const editDueDate = createAsyncThunk('editDueDate', async (data, { rejectWithValue }) => {
  try {
    const response = await axiosApi.post('/edit-ord-inv-date', {
      ...data
    });
    return response.data.body;
  } catch (error) {
    if (!error.response) {
      throw error;
    }
    return rejectWithValue(error.response.data);
  }
});

export const editDeliveryPerson = createAsyncThunk(
  'editDeliveryPerson',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosApi.post('/person-name-update', {
        ...data
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
const invoiceSlice = createSlice({
  name: "invoice",
  initialState: initialStates,
  extraReducers: {
    [searchInvoice.pending]: (state, action) => {
      state.status = "loading";
    },
    [searchInvoice.fulfilled]: (state, action) => {
      state.status = "succeed";
      state.data =
        action.payload.page === 1
          ? action.payload.response
          : {
              ...state.data,
              ...action.payload.response,
              data: [
                ...(state.data?.data ?? []),
                ...(action.payload?.response?.data ?? []),
              ],
            };
    },
    [searchInvoice.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    [invoiceData.pending]: (state, action) => {
      state.status = "loading";
    },
    [invoiceData.fulfilled]: (state, action) => {
      state.status = "succeed";
      state.data =
        action.payload.page === 1
          ? action.payload.response
          : {
              ...state.data,
              ...action.payload.response,
              data: [
                ...(state.data?.data ?? []),
                ...(action.payload?.response?.data ?? []),
              ],
            };
      state.invoiceItemData =
        action.payload.page === 1
          ? action.payload.response
          : {
              ...state.invoiceItemData,
              ...action.payload.response,
              data: [
                ...(state.invoiceItemData?.data ?? []),
                ...(action.payload?.response?.data ?? []),
              ],
            };
    },
    [invoiceData.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    [singleInvoiceData.pending]: (state, action) => {
      state.status = "loading";
    },
    [singleInvoiceData.fulfilled]: (state, action) => {
      state.status = "succeed";
      state.singleData = action.payload;
    },
    [singleInvoiceData.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    [invoiceDetail.pending]: (state, action) => {
      state.status = "loading";
    },
    [invoiceDetail.fulfilled]: (state, action) => {
      state.status = "succeed";
      state.invDetails = action.payload;
    },
    [invoiceDetail.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    [getDeliveryPersonList.pending]: (state, action) => {
      state.status = "loading";
    },
    [getDeliveryPersonList.fulfilled]: (state, action) => {
      state.status = "succeed";
      state.deliveryPersonList = action.payload;
    },
    [getDeliveryPersonList.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    [markDelivered.pending]: (state, action) => {
      state.status = "loading";
    },
    [markDelivered.fulfilled]: (state, action) => {
      state.status = "succeed";
      state.delivered = action.payload;
    },
    [markDelivered.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    [addInvoiceItems.pending]: (state, action) => {
      state.status = "loading";
    },
    [addInvoiceItems.fulfilled]: (state, action) => {
      state.status = "succeed";
      state.addInvoiceItemsData = action.payload;
    },
    [addInvoiceItems.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    [editInvoiceItems.pending]: (state, action) => {
      state.status = "loading";
    },
    [editInvoiceItems.fulfilled]: (state, action) => {
      state.status = "succeed";
      state.editInvoiceItemsData = action.payload;
    },
    [editInvoiceItems.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    [getInvoiceItems.pending]: (state, action) => {
      state.status = "loading";
    },
    [getInvoiceItems.fulfilled]: (state, action) => {
      state.status = "succeed";
      state.invoiceItemData =
        action.payload.page === 1
          ? action.payload.response
          : {
              ...state.invoiceItemData,
              ...action.payload.response,
              data: [
                ...(state.invoiceItemData?.data ?? []),
                ...(action.payload?.response?.data ?? []),
              ],
            };
    },
    [getInvoiceItems.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    [editDueDate.pending]: (state, action) => {
      state.status = "loading";
    },
    [editDueDate.fulfilled]: (state, action) => {
      state.status = "succeed";
    },
    [editDueDate.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    [editDeliveryPerson.pending]: (state, action) => {
      state.status = "loading";
    },
    [editDeliveryPerson.fulfilled]: (state, action) => {
      state.status = "succeed";
    },
    [editDeliveryPerson.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
  },
  reducers: {
    setOrder(state, action) {
      state.order = action.payload;
    },
  },
});

export const { setOrder } = invoiceSlice.actions;
const { reducer } = invoiceSlice;
export default reducer;
