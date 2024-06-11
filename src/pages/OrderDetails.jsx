import React, { useContext, useState } from "react";
import Header from "../components/Header";
import { OrderSearchContext } from "../context/OrderSearchProvider.jsx";
import "../styles/orderDetails.css";
import { calculateTimeDifference, formatDate } from "../utils.jsx";

const OrderDetails = () => {
  const { orderId, setOrderId } = useContext(OrderSearchContext);

  return (
    <div>
      <div className="order__wrapper">
        <Header className="order__header" />
      </div>
      <>
        {error ? (
          <p className="order-details__error">{error}</p>
        ) : (
          <>
            <div className="order-details__wrapper">
              <div className="order-details__header">
                <h2 className="order-details__title">Order status:</h2>
                {!dataResponse.priority ? (
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
                  {/* Only {calculateTimeDifference(dataResponse.estimatedDelivery)} */}
                  <span className="order-details__time_margin">minutes</span>
                  <span className="order-details__time_margin"> left </span>😃
                </p>
                <p className="order-details__time_small">
                  (Estimated delivery:
                  {/* {formatDate(dataResponse.estimatedDelivery)} */})
                </p>
              </div>
              <div>
                <hr className="order-details__line" />
                {/* {dataResponse &&
                  dataResponse.cart &&
                  dataResponse.cart.map((item) => {
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
                  })} */}
              </div>
              <div>
                {/* {!dataResponse.priority ? (
                  <div>
                    <div className="order-details__price">
                      <p>Price pizza: €{dataResponse.orderPrice.toFixed(2)} </p>
                      <p className="order-details__price_text">
                        To pay on delivery: €
                        {dataResponse.orderPrice.toFixed(2)}
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
                    <p>Price pizza: €{dataResponse.orderPrice.toFixed(2)} </p>
                    <p className="order-details__price_regular">
                      Price priority: €{dataResponse.priorityPrice}
                    </p>
                    <p className="order-details__price_text">
                      To pay on delivery: €{totalAmount}
                    </p>
                  </div>
                )} */}
              </div>
            </div>
          </>
        )}
      </>
    </div>
  );
};

export default OrderDetails;
