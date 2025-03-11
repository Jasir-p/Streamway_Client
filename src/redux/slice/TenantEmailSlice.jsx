import { createSlice } from "@reduxjs/toolkit";

const initialState={
    email:null,
}

const tenantEmailSlice =createSlice({
    name: 'tenantEmail',
    initialState,
    reducers:{
        setTenantEmail(state,action){
            state.email =action.payload
            },
        }
    }
)
export const { setTenantEmail } = tenantEmailSlice.actions;
export default tenantEmailSlice.reducer;