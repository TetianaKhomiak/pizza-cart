import { createSlice } from "@reduxjs/toolkit";

export const currentCartKey = "currentCart";

let initialState = {
  currentCart: JSON.parse(localStorage.getItem(currentCartKey)) ?? null,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.currentCart = action.payload;
    },
    resetCart: () => (initialState = { currentCart: null }),
  },
});

export default cartSlice.reducer;
export const { setCart, resetCart } = cartSlice.actions;
