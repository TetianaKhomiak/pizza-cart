import { Control } from "react-hook-form";

export type CartItem = {
  id: string | number;
  name: string;
  unitPrice: number;
  imageUrl: string;
  ingredients: string[];
  qty: number;
  totalItemPrice: number;
};

export type CounterSliceState = {
  items: CartItem[];
  totalItemsAmount: number;
  totalItemsPrice: number;
  priority?: boolean;
  priorityPrice?: number;
};

export type CartSliceState = {
  currentCart: CounterSliceState | null;
};

export interface Pizza {
  id: number;
  name: string;
  unitPrice: number;
  imageUrl: string;
  ingredients: string[];
  soldOut: boolean;
}

export interface PizzaItemProps {
  pizza: Pizza;
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

export interface ButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export interface InputProps {
  name: string;
  control: Control<any>;
  className?: string;
  id?: string;
  type: string;
  placeholder: string;
  setUserName?: (value: string) => void;
}
