import React from "react";
import Button from "./Button";

const Counter = ({ id }) => {
  return (
    <div className="pizza__counter_counter">
      <Button className="pizza__btn_counter" text="-" />
      <span></span>
      <Button className="pizza__btn_counter" text="+" />
      <Button className="pizza__btn_delete" text="RESET" />
    </div>
  );
};

export default Counter;
