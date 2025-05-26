import { Link } from "react-router-dom";
import { useAppSelector } from "../api/hooks";
import "../styles/footer.css";

const Footer = () => {
  const totalItemsAmount = useAppSelector(
    (state) => state.counter.totalItemsAmount
  );
  const cart = useAppSelector((state) => state.cart.currentCart);
  const totalItemsPrice = useAppSelector(
    (state) => state.counter.totalItemsPrice
  );

  const finalItemsPrice = cart?.priority
    ? (totalItemsPrice + (cart.priorityPrice ?? 0)).toFixed(2)
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

      <Link className="footer__link" to="/pizza-cart/cart">
        OPEN CART →
      </Link>
    </div>
  );
};

export default Footer;
