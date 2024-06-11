import { useState } from "react";
import Button from "./Button.jsx";
import Counter from "./Counter.jsx";

function PizzaItem({ pizza }) {
  const { id, name, unitPrice, imageUrl, ingredients, soldOut } = pizza;
  const [isAddingCounter, setIsAddingCounter] = useState(false);

  const handleDelete = (id) => {
    setIsAddingCounter(false);
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
              <Counter id={id} />
              <Button
                className="pizza__btn_delete"
                onClick={() => handleDelete(id)}
                text="DELETE"
              />
            </div>
          ) : (
            !soldOut && <Button text="Add to cart" className="pizza__btn_add" />
          )}
        </div>
      </div>
    </li>
  );
}

export default PizzaItem;
