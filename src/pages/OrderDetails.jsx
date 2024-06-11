import React, { useContext, useState } from "react";
import Header from "../components/Header";
import { OrderSearchContext } from "../context/OrderSearchProvider.jsx";
import "../styles/orderDetails.css";
import { calculateTimeDifference, formatDate } from "../utils.jsx";
import { useSelector, useDispatch } from "react-redux";
import { usePostOrderMutation } from "../api/apiSlice.jsx";
import { setCart } from "../redux/cartSlice.jsx";
import { useNavigate } from "react-router-dom";

const OrderDetails = () => {
  const { orderId, setOrderId } = useContext(OrderSearchContext);
  const [error, setError] = useState("");
  const totalItemsPrice = useSelector((state) => state.counter.totalItemsPrice);
  const cart = useSelector((state) => state.cart.currentCart);
  const [postOrder] = usePostOrderMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePriority = async () => {
    const orderPayload = {
      ...cart.data,
      priority: true,
    };

    try {
      const response = await postOrder(orderPayload).unwrap();
      dispatch(setCart(response));
      setOrderId(response.data.id);
      navigate(`/pizzas-app/order/${response.data.id}`);
    } catch (e) {
      console.log(e.message);
      setError(
        "Some issues have occurred 😔 Please, contact us on 000 555 33 22"
      );
    }
  };

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
                <h2 className="order-details__title">
                  Order {cart.data.id} status: {cart.data.status}
                </h2>
                {!cart.data.priority ? (
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
                  Only {calculateTimeDifference(cart.data.estimatedDelivery)}
                  <span className="order-details__time_margin">minutes</span>
                  <span className="order-details__time_margin"> left </span>😃
                </p>
                <p className="order-details__time_small">
                  (Estimated delivery:
                  {formatDate(cart.data.estimatedDelivery)})
                </p>
              </div>
              <div>
                <hr className="order-details__line" />
                {cart.data &&
                  cart.data.cart &&
                  cart.data.cart.map((item) => {
                    return (
                      <div key={item.pizzaId}>
                        <div className="order-details__item">
                          <p>
                            <span className="order-details__item_bold">
                              {item.quantity}×
                            </span>
                            {item.name}
                          </p>
                          {/* <p className="order-details__item_bold">
                            €{item.totalPrice.toFixed(2)}
                          </p> */}
                        </div>
                      </div>
                    );
                  })}
              </div>
              <div>
                {!cart.data.priority ? (
                  <div>
                    <div className="order-details__price">
                      <p>Price pizza: €{cart.data.orderPrice.toFixed(2)} </p>
                      <p className="order-details__price_text">
                        To pay on delivery: €{totalItemsPrice.toFixed(2)}
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
                    <p>Price pizza: €{cart.data.orderPrice.toFixed(2)} </p>
                    <p className="order-details__price_regular">
                      Price priority: €{cart.data.priorityPrice}
                    </p>
                    <p className="order-details__price_text">
                      To pay on delivery: €
                      {cart.data.orderPrice + cart.data.priorityPrice}
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
