import { createContext } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";

export const OrderDetailsContext = createContext(null);

const OrderDetailsProvider = ({ children }) => {
  const [orderId, setOrderId] = useLocalStorage("orderId", "");
  const [orderDetails, setOrderDetails] = useLocalStorage("orderDetails", []);

  const orderIdValue = {
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
