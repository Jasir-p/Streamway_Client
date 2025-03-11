import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for fetching permissions
export const fetchPermission = createAsyncThunk(
  "permission/fetchPermission",
  async (_, { rejectWithValue }) => {
    try {
      const subdomain = localStorage.getItem("subdomain");
      const token = localStorage.getItem("access_token");
      const response = await axios.get(`http://${subdomain}.localhost:8000/permission/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching permissions"); 
    }
  }
);

const permissionSlice = createSlice({
  name: "permission",
  initialState: {
    permissions: [],
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchPermission.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPermission.fulfilled, (state, action) => {
        state.loading = false;
        state.permissions = action.payload; // ✅ Properly set the fetched data
      })
      .addCase(fetchPermission.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // ✅ Handle errors properly
      });
  },
});

export default permissionSlice.reducer;
