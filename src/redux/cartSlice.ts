import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { CounterSliceState, CartSliceState } from "../types/types";

export const currentCartKey: string = "currentCart";

const savedCart = localStorage.getItem(currentCartKey);

const initialState: CartSliceState = {
  currentCart: savedCart ? JSON.parse(savedCart) : null,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<CounterSliceState>) => {
      state.currentCart = action.payload;
    },
    resetCart: (state) => {
      state.currentCart = null;
    },
  },
});

export default cartSlice.reducer;
export const { setCart, resetCart } = cartSlice.actions;
