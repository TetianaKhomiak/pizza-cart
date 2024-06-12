import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "../styles/footer.css";

const Footer = () => {
  const totalItemsAmount = useSelector(
    (state) => state.counter.totalItemsAmount
  );
  const cart = useSelector((state) => state.cart.currentCart);
  const totalItemsPrice = useSelector((state) => state.counter.totalItemsPrice);
  const finalItemsPrice =
    cart && cart.data && cart.data.priority
      ? (totalItemsPrice + cart.data.priorityPrice).toFixed(2)
      : totalItemsPrice.toFixed(2);

  return (
    <div className="footer__wrapper">
      <div className="footer__el">
        <div>
          {totalItemsAmount > 1 ? (
            <p>
              {totalItemsAmount} PIZZAS €{finalItemsPrice}
            </p>
          ) : (
            <p>
              {totalItemsAmount} PIZZA €{finalItemsPrice}
            </p>
          )}
        </div>
      </div>

      <Link
        className="footer__link"
        to="/pizza-app-redux-toolkit-rtk-query/cart">
        OPEN CART →
      </Link>
    </div>
  );
};

export default Footer;
