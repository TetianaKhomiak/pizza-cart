import { Control } from "react-hook-form";

export interface HeaderProps {
  className: string;
}
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
  address: string;
  customer: string;
  phone: string;
  priority: boolean;
  position: string;
  cart: {
    pizzaId: number;
    name: string;
    quantity: number;
    totalPrice: number;
    unitPrice: number;
    ingredients: string[];
  }[];
}
export interface OrderPayloadForm {
  address: string;
  customer: string;
  phone: string;
  priority: boolean;
  position: string;
  cart: {
    pizzaId: number;
    name: string;
    quantity: number;
    totalPrice: number;
    unitPrice: number;
    ingredients: string[];
  }[];
}

export interface OrderResponse {
  status: string;
  data: {
    id: string;
    customer: string;
    phone: string;
    address: string;
    cart: {
      pizzaId: number;
      name: string;
      quantity: number;
      totalPrice: number;
      unitPrice: number;
      ingredients: string[];
      addIngredients?: string[];
      removeIngredients?: string[];
    }[];
    orderPrice: number;
    priority: boolean;
    priorityPrice: number;
    estimatedDelivery: string;
    status: string;
    position: string;
    createdAt: string;
  };
}
export type Order = OrderResponse["data"];

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
  placeholder?: string;
  setUserName?: (value: string) => void;
}

export interface UserNameContextType {
  userName: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
}

export type ContextProviderProps = {
  children: React.ReactNode;
};

export interface OrderDetailsContextType {
  orderId: string;
  setOrderId: React.Dispatch<React.SetStateAction<string>>;
  orderDetails: Order[];
  setOrderDetails: React.Dispatch<React.SetStateAction<Order[]>>;
}
