import { configureStore } from "@reduxjs/toolkit";
import roleReducer from "./slice/roleSlice";
import permissionReducer from "./slice/PermissionSlice";
import tenantEmailReducer from "./slice/TenantEmailSlice";
import userListReducer from "./slice/UsersSlice";
import EmployeeReducer from "./slice/EmployeeSlice";
import authrizReducer from "./slice/authrizeSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import  teamsSliceReducer from "./slice/TeamSlice";


const persistConfigAuth = {
  key: "auth",
  storage,
};

const persistConfigEmployee = {
  key: "employee",
  storage,
};

const persistConfigTenantEmail = {
  key: "tenantEmail",
  storage,
};

// Wrap reducers that need persistence
const persistedAuth = persistReducer(persistConfigAuth, authrizReducer);
const persistedEmployee = persistReducer(persistConfigEmployee, EmployeeReducer);
const persistedTenantEmail = persistReducer(persistConfigTenantEmail, tenantEmailReducer);

// Configure store
const store = configureStore({
  reducer: {
    roles: roleReducer,
    permission: permissionReducer,
    tenantEmail: persistedTenantEmail,
    users: userListReducer,
    employesubdomain: persistedEmployee,
    auth: persistedAuth,
    teams: teamsSliceReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Ignore serialization warning
    }),
});

// Persistor for Redux Persist
export const persistor = persistStore(store);
export default store;
