import {
  configureStore,
  createListenerMiddleware,
  isAnyOf,
} from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import counterReducer, {
  addItem,
  decrementItemAmount,
  deleteItem,
  resetItemAmount,
  clearCart,
  itemsKey,
  totalItemsAmountKey,
  totalItemsPriceKey,
} from "../redux/counterSlice";
import cartReducer, { setCart, currentCartKey } from "../redux/cartSlice";

const localStorageMiddleware = createListenerMiddleware();

localStorageMiddleware.startListening({
  matcher: isAnyOf(
    addItem,
    decrementItemAmount,
    deleteItem,
    resetItemAmount,
    clearCart,
    setCart
  ),
  effect: (action, listenerApi) => {
    const state = listenerApi.getState() as RootState;
    localStorage.setItem(itemsKey, JSON.stringify(state.counter.items));
    localStorage.setItem(
      totalItemsAmountKey,
      JSON.stringify(state.counter.totalItemsAmount)
    );
    localStorage.setItem(
      totalItemsPriceKey,
      JSON.stringify(state.counter.totalItemsPrice)
    );
    localStorage.setItem(
      currentCartKey,
      JSON.stringify(state.cart.currentCart)
    );
  },
});

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    cart: cartReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      localStorageMiddleware.middleware,
      apiSlice.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
