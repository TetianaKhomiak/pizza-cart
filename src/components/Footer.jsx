import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "../styles/footer.css";

const Footer = () => {
  const totalItemsAmount = useSelector(
    (state) => state.counter.totalItemsAmount
  );
  const totalItemsPrice = useSelector((state) =>
    state.counter.totalItemsPrice.toFixed(2)
  );

  return (
    <div className="footer__wrapper">
      <div className="footer__el">
        <div>
          {totalItemsAmount > 1 ? (
            <p>
              {totalItemsAmount} PIZZAS €{totalItemsPrice}
            </p>
          ) : (
            <p>
              {totalItemsAmount} PIZZA €{totalItemsPrice}
            </p>
          )}
        </div>
      </div>
      <Link className="footer__link" to="/pizzas-app/cart">
        OPEN CART →
      </Link>
    </div>
  );
};

export default Footer;
