import React, { useContext, useEffect } from "react";
import FormLogin from "../components/FormLogin.jsx";
import Header from "../components/Header.jsx";
import { UserContext } from "../context/UserNameProvider.jsx";
import { useDispatch } from "react-redux";
import { resetCart } from "../redux/cartSlice.jsx";
import { resetCounter } from "../redux/counterSlice.jsx";

const Login = () => {
  const { setUserName } = useContext(UserContext);
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.removeItem("userName");
    // localStorage.removeItem("orderId");
    dispatch(resetCart());
    dispatch(resetCounter());
    setUserName("");
  }, []);

  return (
    <>
      <Header className="login__header" />
      <div className="login__wrapper">
        <h1 className="login__title">
          The best pizza.
          <br />
          <span className="login__text">
            Straight out of the oven, straight to you.
          </span>
        </h1>
        <p className="login__text_small">
          👋 Welcome! Please start by telling us your name:
        </p>
        <FormLogin />
      </div>
    </>
  );
};

export default Login;
