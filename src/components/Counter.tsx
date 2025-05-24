import { useAppSelector, useAppDispatch } from "../api/hooks";
import {
  addItem,
  decrementItemAmount,
  resetItemAmount,
} from "../redux/counterSlice";
import Button from "./Button";
import type { PizzaItemProps } from "../types/types.ts";

const Counter = ({ pizza }: PizzaItemProps) => {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.counter.items);
  const counter = items.find((item) => item.id === pizza.id)?.qty;

  const handleDecrementAmount = () => {
    const cartItem = {
      id: pizza.id,
      name: pizza.name,
      unitPrice: pizza.unitPrice,
      imageUrl: pizza.imageUrl,
      ingredients: pizza.ingredients,
      qty: 1,
      totalItemPrice: pizza.unitPrice,
    };
    dispatch(decrementItemAmount(cartItem));
  };

  const handleAddItem = () => {
    const cartItem = {
      id: pizza.id,
      name: pizza.name,
      unitPrice: pizza.unitPrice,
      imageUrl: pizza.imageUrl,
      ingredients: pizza.ingredients,
      qty: 1,
      totalItemPrice: pizza.unitPrice,
    };
    dispatch(addItem(cartItem));
  };

  const handleResetItemAmount = () => {
    const cartItem = {
      id: pizza.id,
      name: pizza.name,
      unitPrice: pizza.unitPrice,
      imageUrl: pizza.imageUrl,
      ingredients: pizza.ingredients,
      qty: 1,
      totalItemPrice: pizza.unitPrice,
    };
    dispatch(resetItemAmount(cartItem));
  };

  return (
    <div className="pizza__counter_counter">
      <Button
        onClick={handleDecrementAmount}
        className="pizza__btn_counter"
        text="-"
      />
      <span>{counter}</span>
      <Button onClick={handleAddItem} className="pizza__btn_counter" text="+" />
      <Button
        onClick={handleResetItemAmount}
        className="pizza__btn_delete"
        text="RESET"
      />
    </div>
  );
};

export default Counter;
