import React from "react";
import Button from "./Button";
import { useSelector, useDispatch } from "react-redux";
import {
  addItem,
  decrementItemAmount,
  resetItemAmount,
} from "../redux/counterSlice";

const Counter = ({ pizza }) => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.counter.items);
  const counter = items.find((item) => item.id === pizza.id)?.qty;

  return (
    <div className="pizza__counter_counter">
      <Button
        onClick={() => dispatch(decrementItemAmount(pizza))}
        className="pizza__btn_counter"
        text="-"
      />
      <span>{counter}</span>
      <Button
        onClick={() => dispatch(addItem(pizza))}
        className="pizza__btn_counter"
        text="+"
      />
      <Button
        onClick={() => dispatch(resetItemAmount(pizza))}
        className="pizza__btn_delete"
        text="RESET"
      />
    </div>
  );
};

export default Counter;
