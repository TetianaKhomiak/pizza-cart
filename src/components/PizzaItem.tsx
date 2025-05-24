import { useState } from "react";
import { useAppDispatch } from "../api/hooks.ts";
import { addItem, deleteItem } from "../redux/counterSlice.ts";
import Button from "./Button.js";
import Counter from "./Counter.js";
import type { PizzaItemProps } from "../types/types.ts";

function PizzaItem({ pizza }: PizzaItemProps) {
  const { name, unitPrice, imageUrl, ingredients, soldOut } = pizza;
  const [isAddingCounter, setIsAddingCounter] = useState(false);
  const dispatch = useAppDispatch();

  const handleRemoveFromCart = () => {
    const cartItem = {
      id: pizza.id,
      name: pizza.name,
      unitPrice: pizza.unitPrice,
      imageUrl: pizza.imageUrl,
      ingredients: pizza.ingredients,
      qty: 1,
      totalItemPrice: pizza.unitPrice,
    };
    dispatch(deleteItem(cartItem));
    setIsAddingCounter(false);
  };

  const handleAddToCart = () => {
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
    setIsAddingCounter(true);
  };

  const formattedIngredients = ingredients
    .map(
      (ingredient) => ingredient.charAt(0).toUpperCase() + ingredient.slice(1)
    )
    .join(", ");

  return (
    <li className="pizza">
      {!soldOut ? (
        <img src={imageUrl} className="pizza__image" alt={name} />
      ) : (
        <img src={imageUrl} className="pizza__image_soldout" alt={name} />
      )}

      <div className="pizza__info">
        <p className="pizza__name">{name}</p>
        <p className="pizza__ingredients">{formattedIngredients}</p>
        <div className="pizza__actions">
          {!soldOut ? (
            <p className="pizza__price">€{unitPrice}</p>
          ) : (
            <p className="pizza__price">Sold out</p>
          )}
          {isAddingCounter ? (
            <div className="pizza__btn_block">
              <Counter pizza={pizza} />
              <Button
                className="pizza__btn_delete"
                onClick={handleRemoveFromCart}
                text="DELETE"
              />
            </div>
          ) : (
            !soldOut && (
              <Button
                onClick={handleAddToCart}
                text="Add to cart"
                className="pizza__btn_add"
              />
            )
          )}
        </div>
      </div>
    </li>
  );
}

export default PizzaItem;
