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

export interface Pizza {
  id: number;
  name: string;
  unitPrice: number;
  imageUrl: string;
  ingredients: string[];
  soldOut: boolean;
}

export interface OrderRequest {
  items: {
    pizzaId: number;
    quantity: number;
  }[];
  customerName: string;
  address: string;
}

export interface OrderResponse {
  orderId: string;
  status: string;
  estimatedDeliveryTime: string;
}
