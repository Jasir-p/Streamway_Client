import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    subdomain: null
};

const EmployeeSlice = createSlice({
    name: "employesubdomain",
    initialState,
    reducers: {
        setEmployeeSubdomain(state, action) {
            state.subdomain = action.payload;
        },
    }
});

export const { setEmployeeSubdomain } = EmployeeSlice.actions;
export default EmployeeSlice.reducer;
