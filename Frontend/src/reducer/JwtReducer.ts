import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import UserAccountEntity from "../entity/UserAccountEntity";
const authenticatorSlice = createSlice({
    name: "authenticator",
    initialState: {
        user: null,
        access_token: null,
    },
    reducers: { 
        login: (state, action) => {
            const access_token = action.payload;
            state.access_token = access_token;
            const jwtUser: UserAccountEntity = jwtDecode(access_token);
            state.user = jwtUser;
        },
        logout: (state) => {
            state.user = null;
            state.access_token = null;
        },
    },
})

export const { login, logout } = authenticatorSlice.actions;
export default authenticatorSlice.reducer;