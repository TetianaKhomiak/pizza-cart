import { createContext, useContext } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
import type {
  ContextProviderProps,
  OrderDetailsContextType,
} from "../types/types";
import type { Order } from "../types/types";

const OrderDetailsContext = createContext<OrderDetailsContextType | null>(null);

export const useOrderDetailsContext = () => {
  const context = useContext(OrderDetailsContext);
  if (!context) {
    throw new Error(
      "useOrderDetailsContext must be used within a OrderDetailsProvider"
    );
  }
  return context;
};

const OrderDetailsProvider = ({ children }: ContextProviderProps) => {
  const [orderId, setOrderId] = useLocalStorage<string>("orderId", "");
  const [orderDetails, setOrderDetails] = useLocalStorage<Order[]>(
    "orderDetails",
    []
  );

  const orderIdValue: OrderDetailsContextType = {
    orderId,
    setOrderId,
    orderDetails,
    setOrderDetails,
  };

  return (
    <OrderDetailsContext.Provider value={orderIdValue}>
      {children}
    </OrderDetailsContext.Provider>
  );
};

export default OrderDetailsProvider;
