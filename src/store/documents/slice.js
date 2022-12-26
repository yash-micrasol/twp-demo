import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosApi } from "../../helpers/api";
import initialStates from "./state";

export const getDocuments = createAsyncThunk(
  "getDocuments",
  async ({ search, page }, { rejectWithValue }) => {
    try {
      const response = await axiosApi.post("/category-list", {
        type: "all",
        search_text: search,
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

export const viewDocuments = createAsyncThunk(
  "viewDocuments",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosApi.post("/category-list-view", {
        search_text: "",
        ...data,
      });

      return { response: response.data.body, page: data.page };
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

// create slice
const documentsSlice = createSlice({
  name: "documents",
  initialState: initialStates,
  extraReducers: {
    [getDocuments.pending]: (state, action) => {
      state.status = "loading";
    },
    [getDocuments.fulfilled]: (state, action) => {
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
    [getDocuments.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    [viewDocuments.pending]: (state, action) => {
      state.status = "loading";
    },
    [viewDocuments.fulfilled]: (state, action) => {
      state.status = "succeed";
      state.document =
        action.payload.page === 1
          ? action.payload.response
          : {
              ...state.document,
              ...action.payload.response,
              data: [
                ...(state.document?.data ?? []),
                ...(action.payload?.response?.data ?? []),
              ],
            };
    },
    [viewDocuments.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

const { reducer } = documentsSlice;
export default reducer;
