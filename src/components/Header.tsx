import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { OrderDetailsContext } from "../context/OrderDetailsProvider.jsx";
import { useUserNameContext } from "../context/UserNameProvider.tsx";

function Header({ className }) {
  const { userName } = useUserNameContext();
  const { setOrderId } = useContext(OrderDetailsContext);
  const { orderDetails } = useContext(OrderDetailsContext);

  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    setValue(e.target.value);
  };

  const isOrderExist = orderDetails.find((item) => item.id === value.trim());

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (value.trim() !== "") {
        if (isOrderExist) {
          setOrderId(value.trim());
          navigate(`/pizza-app-redux-toolkit-rtk-query/order/${value.trim()}`);
          setValue("");
        } else {
          navigate("/pizza-app-redux-toolkit-rtk-query/order/not-found");
          setValue("");
        }
      }
    }, 1500);
    return () => clearTimeout(timeoutId);
  }, [value]);

  return (
    <header className={className}>
      <a className="logo" href="/pizza-app-redux-toolkit-rtk-query/menu">
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
