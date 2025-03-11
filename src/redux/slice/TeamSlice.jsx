import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTeams = createAsyncThunk('teams/FetchTeams', async (_,{rejectWithValue}) => {
    try {
        const token = localStorage.getItem("access_token");
        const subdomain = localStorage.getItem("subdomain");

        if (!token) return rejectWithValue("No token found, please log in again.");
        if (!subdomain) return rejectWithValue("Subdomain not set.");

        const response = await axios.get(`http://${subdomain}.localhost:8000/team/`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        console.log(response.data);
        return response.data.teams;
    } catch (error) {
        console.error("Error fetching users:", error.response?.data || error.message);
        return rejectWithValue(error.response?.data || "Failed to fetch users");
    }
})

export const addTeam = createAsyncThunk('teams/AddTeam',async(data,{rejectWithValue})=>{
    try {
        const token = localStorage.getItem("access_token");
        const subdomain = localStorage.getItem("subdomain");
        const response = await axios.post(`http://${subdomain}.localhost:8000/team/`,data,{
            headers: { Authorization: `Bearer ${token}` },
            });
            return response.data.message;

        }catch(error){
            console.error("Error adding team:", error.response?.data || error.message);
            return rejectWithValue(error.response?.data || "Failed to add team");
            
        }

            
                
})

const teamsSlice = createSlice({
    name: 'teams',
    initialState: {
        teams: [],
        status: 'idle',
        error: null,
        loading:false},
        reducers: {},
        extraReducers: (builder) => {
            builder
            .addCase(fetchTeams.pending, (state) => {
                state.status = 'loading'
                state.loading = true
                })
                .addCase(fetchTeams.fulfilled, (state, action) => {
                    state.status = 'succeeded'
                    state.teams = action.payload
                    state.loading = false
                    })
                    .addCase(fetchTeams.rejected, (state, action) => {
                        state.status = 'failed'
                        state.error = action.payload
                        state.loading = false
                        })
                        .addCase(addTeam.pending, (state) => {
                            state.status = 'loading'
                            state.loading = true
                            })
                            .addCase(addTeam.fulfilled, (state, action) => {
                                state.status = 'succeeded'
                                state.teams.push(action.payload)
                                state.loading = false
                                })
                                .addCase(addTeam.rejected, (state, action) => {
                                    state.status = 'failed'
                                    state.error = action.payload
                                    state.loading = false
                                    })
                                    
                        }
                        })
    


export default teamsSlice.reducer;

