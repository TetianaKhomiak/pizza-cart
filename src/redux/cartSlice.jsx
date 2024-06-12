import { createSlice } from "@reduxjs/toolkit";

export const currentCartKey = "currentCart";

const initialState = {
  currentCart: JSON.parse(localStorage.getItem(currentCartKey)) ?? null,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.currentCart = action.payload;
    },
  },
});

export default cartSlice.reducer;
export const { setCart } = cartSlice.actions;
