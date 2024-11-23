import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: "products",
    initialState: {
        products: [],
        currentProduct: { id: "", name: "", type: "", price: 0, rating: 0, warranty_years: 0, available: false },
    },
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload;
        },
        setCurrentProduct: (state, action) => {
            state.currentProduct = action.payload;
        },

        getProducts: (state, action) => {
            state.products = action.payload;
        }
    }
});
export const { setProducts, setCurrentProduct } = productSlice.actions;
export default productSlice.reducer;