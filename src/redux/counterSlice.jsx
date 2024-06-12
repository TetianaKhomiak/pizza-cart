import { createSlice } from "@reduxjs/toolkit";
import { calcTotlaItems, calcTotlaPrice } from "../utils";

export const itemsKey = "items";
export const totalItemsAmountKey = "totalItemsAmount";
export const totalItemsPriceKey = "totalItemsPrice";

const initialState = {
  items: JSON.parse(localStorage.getItem(itemsKey)) ?? [],
  totalItemsAmount: JSON.parse(localStorage.getItem(totalItemsAmountKey)) ?? 0,
  totalItemsPrice: JSON.parse(localStorage.getItem(totalItemsPriceKey)) ?? 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const isExisting = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (isExisting) {
        isExisting.qty += 1;
        isExisting.totalItemPrice = isExisting.qty * isExisting.unitPrice;
      } else {
        state.items.push({
          ...action.payload,
          qty: 1,
          totalItemPrice: action.payload.unitPrice,
        });
      }
      state.totalItemsAmount = calcTotlaItems(state.items);
      state.totalItemsPrice = calcTotlaPrice(state.items);
    },
    decrementItemAmount: (state, action) => {
      state.items = state.items.map((item) => {
        if (item.id === action.payload.id) {
          item.qty = item.qty > 1 ? item.qty - 1 : item.qty;
          item.totalItemPrice = item.qty * item.unitPrice;
        }
        return item;
      });
      state.totalItemsAmount = calcTotlaItems(state.items);
      state.totalItemsPrice = calcTotlaPrice(state.items);
    },
    resetItemAmount: (state, action) => {
      state.items = state.items.map((item) => {
        if (item.id === action.payload.id) {
          item.qty = 1;
          item.totalItemPrice = item.unitPrice;
        }
        return item;
      });
      state.totalItemsAmount = calcTotlaItems(state.items);
      state.totalItemsPrice = calcTotlaPrice(state.items);
    },
    deleteItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
      state.totalItemsAmount = calcTotlaItems(state.items);
      state.totalItemsPrice = calcTotlaPrice(state.items);
    },
    clearCart: (state) => {
      state.items.length = 0;
      state.totalItemsAmount = 0;
      state.totalItemsPrice = 0;
    },
  },
});

export default counterSlice.reducer;
export const {
  addItem,
  decrementItemAmount,
  deleteItem,
  resetItemAmount,
  clearCart,
} = counterSlice.actions;
