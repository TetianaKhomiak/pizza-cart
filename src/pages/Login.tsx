import { useEffect } from "react";
import FormLogin from "../components/FormLogin.tsx";
import Header from "../components/Header.tsx";
import { useUserNameContext } from "../context/UserNameProvider.tsx";
import { useAppDispatch } from "../api/hooks.ts";
import { resetCart } from "../redux/cartSlice.ts";
import { resetCounter } from "../redux/counterSlice.ts";
import "../styles/login.css";
import "../index.css";

const Login = () => {
  const { setUserName } = useUserNameContext();
  const dispatch = useAppDispatch();

  useEffect(() => {
    localStorage.removeItem("userName");
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
