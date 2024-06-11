import { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserNameProvider.jsx";
import { useNavigate } from "react-router-dom";

function Header({ className }) {
  const { userName } = useContext(UserContext);
  const [value, setValue] = useState("");
  // const { orderId } = useContext(OrderSearchContext);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    setValue(e.target.value);
  };

  // useEffect(() => {
  //   const timeoutId = setTimeout(() => {
  //     if (value.trim() !== "") {
  //       if (orderId.includes(value.trim())) {
  //         navigate(`/pizzas-app/order/${value.trim()}`);
  //       } else {
  //         navigate("/pizzas-app/order/not-found");
  //       }
  //     }
  //   }, 1500);
  //   return () => clearTimeout(timeoutId);
  // }, [value]);

  return (
    <header className={className}>
      <a className="logo" href="/pizzas-app/menu">
        Pizza Day
      </a>

      <input
        onChange={handleSearch}
        className="input__order"
        placeholder="Search for the order #"
        value={value}
        type="text"
      />

      <div className="cart__user">{userName.toUpperCase()}</div>
    </header>
  );
}

export default Header;
