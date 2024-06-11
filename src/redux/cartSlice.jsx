import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentCart: null,
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
