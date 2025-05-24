export type CartItem = {
  id: string | number;
  unitPrice: number;
  qty: number;
  totalItemPrice: number;
};

export type CounterState = {
  items: CartItem[];
  totalItemsAmount: number;
  totalItemsPrice: number;
};

export type CartSliceState = {
  currentCart: CounterState | null;
};
