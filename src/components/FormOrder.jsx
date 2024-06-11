import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input.jsx";
import { UserContext } from "../context/UserNameProvider.jsx";
import { orderSchema } from "../schema/orderSchema.jsx";
import { OrderSearchContext } from "../context/OrderSearchProvider.jsx";
import { usePostOrderMutation } from "../api/apiSlice.jsx";
import { useSelector, useDispatch } from "react-redux";
import { setCart } from "../redux/cartSlice.jsx";

const FormOrder = () => {
  const { userName } = useContext(UserContext);
  const [error, setError] = useState("");
  const [isPrioritized, setIsPrioritized] = useState(false);
  const [postOrder] = usePostOrderMutation();
  const items = useSelector((state) => state.counter.items);
  const totalItemsPrice = useSelector((state) => state.counter.totalItemsPrice);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [finalPrice, setFinalPrice] = useState(totalItemsPrice);
  const cart = useSelector((state) => state.cart.currentCart);

  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      firstName: userName,
      phoneNumber: "",
      address: "",
    },
    resolver: zodResolver(orderSchema),
  });

  const handleOrderPriority = async () => {
    const data = getValues();
    console.log(data);
    const orderPayload = {
      address: data.address,
      customer: data.firstName,
      phone: data.phoneNumber,
      priority: !isPrioritized,
      position: "",
      cart: items.map((item) => ({
        pizzaId: item.id,
        name: item.name,
        quantity: item.qty,
        // totalPrice: item.totalPriceOfItem,
        unitPrice: item.unitPrice,
        ingredients: item.ingredients,
      })),
    };

    try {
      const response = await postOrder(orderPayload).unwrap();
      console.log(response);
      dispatch(setCart(response));
      setIsPrioritized(!isPrioritized);
      setFinalPrice(totalItemsPrice + response.data.priorityPrice);
    } catch (e) {
      console.error(e);
      setError(
        "Some issues have occurred 😔 Please, contact us on 000 555 33 22"
      );
    }
  };

  const onSubmit = async (data) => {
    if (isPrioritized == false) {
      const orderPayload = {
        address: data.address,
        customer: data.firstName,
        phone: data.phoneNumber,
        priority: isPrioritized,
        position: "",
        cart: items.map((item) => ({
          pizzaId: item.id,
          name: item.name,
          quantity: item.qty,
          // totalPrice: item.totalPriceOfItem,
          unitPrice: item.unitPrice,
          ingredients: item.ingredients,
        })),
      };

      try {
        const response = await postOrder(orderPayload).unwrap();
        console.log(response);
        dispatch(setCart(response));
        navigate(`/pizzas-app/order/${response.data.id}`);
      } catch (e) {
        console.error(e);
        setError(
          "Some issues have occurred 😔 Please, contact us on 000 555 33 22"
        );
      }
    } else {
      navigate(`/pizzas-app/order/${cart.data.id}`);
    }
  };

  return (
    <>
      {error ? (
        <h1 className="order__error_bold">{error}</h1>
      ) : (
        <div>
          <h2 className="order__title">Ready to order? Let's go!</h2>
          <form className="order__form" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div className="order__error">
                {errors.firstName && <p>{errors.firstName.message}</p>}
              </div>
              <div className="order__input_wrapper">
                <label className="order__label" htmlFor="first-name">
                  First Name
                </label>
                <Input
                  className="order__input"
                  type="text"
                  id="first-name"
                  name="firstName"
                  control={control}
                />
              </div>
            </div>
            <div>
              <div className="order__error">
                {errors.phoneNumber && <p>{errors.phoneNumber.message}</p>}
              </div>
              <div className="order__input_wrapper">
                <label className="order__label" htmlFor="phone-number">
                  Phone number
                </label>
                <Input
                  className="order__input"
                  type="text"
                  id="phone-number"
                  name="phoneNumber"
                  control={control}
                />
              </div>
            </div>
            <div>
              <div className="order__error">
                {errors.address && <p>{errors.address.message}</p>}
              </div>
              <div className="order__input_wrapper">
                <label className="order__label" htmlFor="address">
                  Address
                </label>
                <Input
                  className="order__input"
                  type="text"
                  id="address"
                  name="address"
                  control={control}
                />
              </div>
            </div>
            <div className="order__checkbox">
              <input
                type="checkbox"
                id="priority"
                checked={isPrioritized}
                onChange={handleOrderPriority}
              />
              <label className="order__label_checkbox" htmlFor="priority">
                Want to give your order priority?
              </label>
            </div>
            {isPrioritized ? (
              <button className="order__btn">
                ORDER NOW FOR €{finalPrice}
              </button>
            ) : (
              <button className="order__btn">
                ORDER NOW FOR €{totalItemsPrice}
              </button>
            )}
          </form>
        </div>
      )}
    </>
  );
};

export default FormOrder;
