import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { usePostOrderMutation } from "../api/apiSlice.jsx";
import Header from "../components/Header";
import { OrderSearchContext } from "../context/OrderSearchProvider.jsx";
import { setCart } from "../redux/cartSlice.jsx";
import "../styles/orderDetails.css";
import { calculateTimeDifference, formatDate } from "../utils.jsx";

const OrderDetails = () => {
  const { orderId, setOrderId } = useContext(OrderSearchContext);
  const [postOrder, { isError }] = usePostOrderMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.currentCart.data);
  const priorityPrice = cart.priorityPrice;
  const orderPrice = cart.orderPrice;
  const finalItemsPrice = cart.priority
    ? orderPrice + priorityPrice
    : orderPrice;

  const handlePriority = async () => {
    const orderPayload = {
      ...cart,
      priority: true,
    };

    try {
      const response = await postOrder(orderPayload).unwrap();

      if (response.status !== "success") {
        throw new Error("Error");
      }

      dispatch(setCart(response));
      setOrderId(response.data.id);
      navigate(`/pizzas-app/order/${response.data.id}`);
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
                  Order {cart.id} status: {cart.status}
                </h2>
                {!cart.priority ? (
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
                  Only {calculateTimeDifference(cart.estimatedDelivery)}
                  <span className="order-details__time_margin">minutes</span>
                  <span className="order-details__time_margin"> left </span>😃
                </p>
                <p className="order-details__time_small">
                  (Estimated delivery:
                  {formatDate(cart.estimatedDelivery)})
                </p>
              </div>
              <div>
                <hr className="order-details__line" />
                {cart &&
                  cart.cart &&
                  cart.cart.map((item) => {
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
                {!cart.priority ? (
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
