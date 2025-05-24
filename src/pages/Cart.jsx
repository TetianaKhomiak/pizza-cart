import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import { UserContext } from "../context/UserNameProvider.jsx";
import {
  addItem,
  clearCart,
  decrementItemAmount,
  deleteItem,
} from "../redux/counterSlice.ts";
import "../styles/cart.css";

const Cart = () => {
  const { userName } = useContext(UserContext);
  const items = useSelector((state) => state.counter.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOrderPizzas = () => {
    navigate("/pizza-app-redux-toolkit-rtk-query/order/new");
  };

  const formattedUserName =
    userName.charAt(0).toUpperCase() + userName.slice(1);

  return (
    <div>
      <div className="cart__wrapper">
        <Header className="cart__header" />
      </div>
      <div className="cart">
        <Link
          className="cart__link"
          to="/pizza-app-redux-toolkit-rtk-query/menu">
          ← Back to menu
        </Link>
        {items.length === 0 ? (
          <p className="cart__message">
            Your cart is still empty. Start adding some pizzas :)
          </p>
        ) : (
          <>
            <h1 className="cart__title">Your cart, {formattedUserName}</h1>
            <div>
              {items.map((item) => (
                <div className="cart__order" key={item.id}>
                  <p className="cart__order_element">
                    {item.qty}× {item.name}
                  </p>
                  <div className="cart__order_wrapper">
                    <p className="cart__total">
                      €{item.totalItemPrice.toFixed(2)}
                    </p>
                    <button
                      onClick={() => dispatch(decrementItemAmount(item))}
                      className="cart__btn_counter">
                      -
                    </button>
                    <p className="cart__order_element">{item.qty}</p>
                    <button
                      onClick={() => dispatch(addItem(item))}
                      className="cart__btn_counter">
                      +
                    </button>
                    <button
                      className="cart__btn_delete"
                      onClick={() => dispatch(deleteItem(item))}>
                      DELETE
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="cart__btn_wrapper">
              <button className="cart__btn_order" onClick={handleOrderPizzas}>
                ORDER PIZZAS
              </button>
              <button
                className="cart__btn_clear"
                onClick={() => dispatch(clearCart())}>
                CLEAR CART
              </button>
            </div>
            <Footer />
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
