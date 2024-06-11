import React from "react";
import { Bars } from "react-loader-spinner";
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import PizzaItem from "../components/PizzaItem.jsx";
import { useFetchAllPizzasQuery } from "../api/apiSlice.jsx";
import "../styles/menu.css";
import { useSelector } from "react-redux";

function Menu() {
  const {
    data: pizzas,
    isLoading,
    isSuccess,
    isError,
  } = useFetchAllPizzasQuery();
  const cartItems = useSelector((state) => state.counter.items);

  let content;
  if (isLoading) {
    return (
      <div className="loader-wrapper">
        <Bars
          height={120}
          width={120}
          color="rgb(120, 113, 108)"
          ariaLabel="bars-loading"
        />
      </div>
    );
  } else if (isSuccess) {
    content = (
      <ul className="pizza__wrapper_items">
        {pizzas.data.map((pizza) => (
          <PizzaItem key={pizza.id} pizza={pizza} />
        ))}
      </ul>
    );
  } else if (isError) {
    content = (
      <h1 className="error">
        "Some issues have occurred 😔 <br /> Please, contact us on <br /> 000
        555 33 22"
      </h1>
    );
  }

  return (
    <div>
      <div className="wrapper">
        <Header className="menu__header" />
      </div>
      <div className="pizza__wrapper">{content}</div>
      {cartItems.length > 0 && <Footer />}
    </div>
  );
}

export default Menu;
