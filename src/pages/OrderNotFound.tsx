import { Link } from "react-router-dom";
import Header from "../components/Header";
import "../styles/menu.css";
import "../index.css";

const OrderNotFound = () => {
  return (
    <div>
      <Header className="menu__header" />
      <div className="order-unfound__wrapper">
        <Link className="order-unfound__link" to="/pizza-cart/menu">
          ← Back to menu
        </Link>
        <p className="order-unfound__title">Order not found</p>
      </div>
    </div>
  );
};

export default OrderNotFound;
