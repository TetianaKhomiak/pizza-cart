import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import { UserContext } from "../context/UserNameProvider.jsx";
import "../styles/cart.css";
import { useSelector, useDispatch } from "react-redux";
import {
  addItem,
  decrementItemAmount,
  deleteItem,
  clearCart,
} from "../redux/counterSlice.jsx";

const Cart = () => {
  const { userName } = useContext(UserContext);
  const items = useSelector((state) => state.counter.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOrderPizzas = () => {
    navigate("/pizzas-app/order/new");
  };

  const formattedUserName =
    userName.charAt(0).toUpperCase() + userName.slice(1);

  return (
    <div>
      <div className="cart__wrapper">
        <Header className="cart__header" />
      </div>
      <div className="cart">
        <Link className="cart__link" to="/pizzas-app/menu">
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
                    {/* <p className="cart__total">
                      €{item.totalPriceOfItem.toFixed(2)}
                    </p> */}
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
