import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOrderDetailsContext } from "../context/OrderDetailsProvider.tsx";
import { useUserNameContext } from "../context/UserNameProvider.tsx";
import type { HeaderProps } from "../types/types.ts";

function Header({ className }: HeaderProps) {
  const { userName } = useUserNameContext();
  const { setOrderId } = useOrderDetailsContext();
  const { orderDetails } = useOrderDetailsContext();

  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const isOrderExist = orderDetails.find((item) => item.id === value.trim());

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (value.trim() !== "") {
        if (isOrderExist) {
          setOrderId(value.trim());
          navigate(`/pizza-cart/order/${value.trim()}`);
          setValue("");
        } else {
          navigate("/pizza-cart/order/not-found");
          setValue("");
        }
      }
    }, 1500);
    return () => clearTimeout(timeoutId);
  }, [value]);

  return (
    <header className={className}>
      <a className="logo" href="/pizza-cart/menu">
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
