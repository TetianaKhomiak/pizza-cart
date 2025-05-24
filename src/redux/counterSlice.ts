import { createSlice } from "@reduxjs/toolkit";
import { calcTotalItems, calcTotalPrice } from "../utils";
import { CartItem, CounterState } from "../types/types";
import { PayloadAction } from "@reduxjs/toolkit";

export const itemsKey: string = "items";
export const totalItemsAmountKey: string = "totalItemsAmount";
export const totalItemsPriceKey: string = "totalItemsPrice";

let initialState: CounterState = {
  items: JSON.parse(localStorage.getItem(itemsKey) ?? "[]"),
  totalItemsAmount: JSON.parse(
    localStorage.getItem(totalItemsAmountKey) ?? "0"
  ),
  totalItemsPrice: JSON.parse(localStorage.getItem(totalItemsPriceKey) ?? "0"),
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addItem: (state: CounterState, action: PayloadAction<CartItem>) => {
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
      state.totalItemsAmount = calcTotalItems(state.items);
      state.totalItemsPrice = calcTotalPrice(state.items);
    },
    decrementItemAmount: (state: CounterState, action) => {
      state.items = state.items.map((item) => {
        if (item.id === action.payload.id) {
          item.qty = item.qty > 1 ? item.qty - 1 : item.qty;
          item.totalItemPrice = item.qty * item.unitPrice;
        }
        return item;
      });
      state.totalItemsAmount = calcTotalItems(state.items);
      state.totalItemsPrice = calcTotalPrice(state.items);
    },
    resetItemAmount: (state: CounterState, action) => {
      state.items = state.items.map((item) => {
        if (item.id === action.payload.id) {
          item.qty = 1;
          item.totalItemPrice = item.unitPrice;
        }
        return item;
      });
      state.totalItemsAmount = calcTotalItems(state.items);
      state.totalItemsPrice = calcTotalPrice(state.items);
    },
    deleteItem: (state: CounterState, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
      state.totalItemsAmount = calcTotalItems(state.items);
      state.totalItemsPrice = calcTotalPrice(state.items);
    },
    clearCart: (state: CounterState) => {
      state.items.length = 0;
      state.totalItemsAmount = 0;
      state.totalItemsPrice = 0;
    },
    resetCounter: () =>
      (initialState = {
        items: [],
        totalItemsAmount: 0,
        totalItemsPrice: 0,
      }),
  },
});

export default counterSlice.reducer;
export const {
  addItem,
  decrementItemAmount,
  deleteItem,
  resetItemAmount,
  clearCart,
  resetCounter,
} = counterSlice.actions;
