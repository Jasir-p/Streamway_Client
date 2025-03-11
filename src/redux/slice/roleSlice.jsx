import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch roles from API
export const fetchRoles = createAsyncThunk("roles/fetchRoles", async () => {
const subdomain =localStorage.getItem("subdomain")
const token = localStorage.getItem("access_token");
const response = await axios.get(`http://${subdomain}.localhost:8000/role/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
});

export const addRole = createAsyncThunk("roles/addRole", async (roleData, { rejectWithValue }) => {
  try {
    const subdomain = localStorage.getItem("subdomain");
    const token = localStorage.getItem("access_token");

    const response = await axios.post(
      `http://${subdomain}.localhost:8000/role/`, 
      roleData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return response.data; // Return the newly created role
  } catch (error) {
    return rejectWithValue(error.response?.data || "Error adding role");
  }
});
export const updateRole = createAsyncThunk("roles/updateRole", async (roleData, { rejectWithValue })=> {
 try {
  console.log(roleData)
  const subdomain = localStorage.getItem("subdomain");
  const token = localStorage.getItem("access_token");
  const role_id = roleData.id;
  const response = await axios.put(`http://${subdomain}.localhost:8000/role/`, roleData, {
      params: { role_id },
      headers: { Authorization: `Bearer ${token}` },
      }); 
      return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || "Error updating role");
        }
})

export const deleteRole = createAsyncThunk("roles/deleteRole", async (role_id, { rejectWithValue}
  ) => {
    try {
      const subdomain = localStorage.getItem("subdomain");
      const token = localStorage.getItem("access_token");
      const response = await axios.delete(`http://${subdomain}.localhost:8000/role/`, {
        params: { role_id },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("fetch", response.data);
      return response.data;
    } catch (error) {
      console.log("Error deleting role:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  })


const roleSlice = createSlice({
  name: "roles",
  initialState: {
    roles: [],
    loading: false,
    error: null,
  },
  reducers: {}, 
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoles.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.loading = false;
        state.roles = action.payload.roles;
        
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addRole.pending,(state)=>{
        state.loading =true
      })
      .addCase(addRole.fulfilled, (state, action) => {
        state.loading = false;
        const newRole = action.payload;
        
        
        if (newRole.parent_role) {
            const addRoleToTree = (roles) => {
                return roles.map(role => {
                    if (role.id === newRole.parent_role) {
                        return { ...role, children: [...(role.children || []), newRole] };
                    } else if (role.children) {
                        return { ...role, children: addRoleToTree(role.children) };
                    }
                    return role;
                });
            };
    
            state.roles = addRoleToTree(state.roles);
        } else {
          
            state.roles.push(newRole);
        }
    })
    
      .addCase(addRole.rejected,(state,action)=>{
        state.loading=false
        state.error=action.payload
      })
      .addCase(updateRole.fulfilled, (state,action)=>{
        state.loading=false
        const updatedRole = action.payload
        
        const updatedRoles = (roles)=>{
          return roles.map(role=>{
            if (role.id===updatedRole.id){
              return {...role,...updatedRole}
              }
              else if(role.children){
                return {...role,children:updatedRoles(role.children)}
                }
                return role
                })
        }

      })
      .addCase(updateRole.pending, (state)=>{
        state.loading = true

      })
      .addCase(updateRole.rejected, (state, action)=>{
        state.loading = false
        state.error = action.payload
      }).addCase(deleteRole.pending, (state)=>{
        state.loading = true
        
      }).addCase(deleteRole.fulfilled, (state,action)=>{
        state.loading=false
        state.roles = state.roles.filter(role=>role.id !== action.payload.id)
        }).addCase(deleteRole.rejected, (state,action)=>{
          state.loading=false
          state.error=action.payload

      })
      
  },
});

export default roleSlice.reducer;
