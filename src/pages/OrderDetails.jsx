import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { usePostOrderMutation } from "../api/apiSlice.jsx";
import Header from "../components/Header";
import { OrderDetailsContext } from "../context/OrderDetailsProvider.jsx";
import "../styles/orderDetails.css";
import { calculateTimeDifference, formatDate } from "../utils.jsx";

const OrderDetails = () => {
  const { orderId, setOrderId, orderDetails, setOrderDetails } =
    useContext(OrderDetailsContext);

  const currentOrder = orderDetails.find((item) => item.id === orderId);

  const [postOrder, { isError }] = usePostOrderMutation();

  const navigate = useNavigate();
  const priorityPrice = currentOrder.priorityPrice;
  const orderPrice = currentOrder.orderPrice;
  const finalItemsPrice = currentOrder.priority
    ? orderPrice + priorityPrice
    : orderPrice;

  console.log(orderDetails);

  const handlePriority = async () => {
    const orderPayload = {
      ...currentOrder,
      priority: true,
    };

    try {
      const response = await postOrder(orderPayload).unwrap();

      if (response.status !== "success") {
        throw new Error("Error");
      }

      setOrderDetails((prevOrderDetails) => {
        const updatedOrderDetails = prevOrderDetails.filter(
          (order) => order.id !== orderId
        );
        return [...updatedOrderDetails, response.data];
      });
      setOrderId(response.data.id);
      navigate(`/pizza-app-redux-toolkit-rtk-query/order/${response.data.id}`);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <div className="order__wrapper">
        <Header className="order__header" />
      </div>
      <>
        {isError ? (
          <p className="order-details__error">
            "Some issues have occurred 😔 Please, contact us on 000 555 33 22"
          </p>
        ) : (
          <>
            <div className="order-details__wrapper">
              <div className="order-details__header">
                <h2 className="order-details__title">
                  Order {currentOrder.id} status: {currentOrder.status}
                </h2>
                {!currentOrder.priority ? (
                  <p className="order-details__title_green">PREPARING ORDER</p>
                ) : (
                  <div className="order-details__priority">
                    <p className="order-details__title_red">PRIORITY</p>
                    <p className="order-details__title_green">ORDER</p>
                  </div>
                )}
              </div>
              <div className="order-details__time">
                <p className="order-details__time_big">
                  Only {calculateTimeDifference(currentOrder.estimatedDelivery)}
                  <span className="order-details__time_margin">minutes</span>
                  <span className="order-details__time_margin"> left </span>😃
                </p>
                <p className="order-details__time_small">
                  (Estimated delivery:
                  {formatDate(currentOrder.estimatedDelivery)})
                </p>
              </div>
              <div>
                <hr className="order-details__line" />
                {currentOrder &&
                  currentOrder.cart &&
                  currentOrder.cart.map((item) => {
                    return (
                      <div key={item.pizzaId}>
                        <div className="order-details__item">
                          <p>
                            <span className="order-details__item_bold">
                              {item.quantity}×
                            </span>
                            {item.name}
                          </p>
                          <p className="order-details__item_bold">
                            €{item.totalPrice.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
              </div>
              <div>
                {!currentOrder.priority ? (
                  <div>
                    <div className="order-details__price">
                      <p>Price pizza: €{orderPrice.toFixed(2)} </p>
                      <p className="order-details__price_text">
                        To pay on delivery: €{finalItemsPrice.toFixed(2)}
                      </p>
                    </div>
                    <button
                      className="order-details__btn"
                      onClick={handlePriority}>
                      PRIORITIZE
                    </button>
                  </div>
                ) : (
                  <div className="order-details__price">
                    <p>Price pizza: €{orderPrice.toFixed(2)} </p>
                    <p className="order-details__price_regular">
                      Price priority: €{priorityPrice.toFixed(2)}
                    </p>
                    <p className="order-details__price_text">
                      To pay on delivery: €{finalItemsPrice.toFixed(2)}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </>
    </div>
  );
};

export default OrderDetails;
