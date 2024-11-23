import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: "window",
    initialState: {
        loginWindow: false,
        registerWindow: false,
        addWindow: false,
        editWindow: false,
        basketWindow: false,
    },
    reducers: {
        setLoginWindow: (state, action) => {
            state.loginWindow = action.payload;
        },
        setRegisterWindow: (state, action) => {
            state.registerWindow = action.payload;
        },
        setAddWindow: (state, action) => {
            state.addWindow = action.payload;
        },
        setEditWindow: (state, action) => {
            state.editWindow = action.payload;
        },
        setBasketWindow: (state, action) => {
            state.basketWindow = action.payload;
        }
    }
});
export const { setLoginWindow, setRegisterWindow, setAddWindow, setEditWindow, setBasketWindow } = productSlice.actions;
export default productSlice.reducer;