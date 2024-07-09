import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { usePostOrderMutation } from "../api/apiSlice.jsx";
import Input from "../components/Input.jsx";
import { OrderDetailsContext } from "../context/OrderDetailsProvider.jsx";
import { UserContext } from "../context/UserNameProvider.jsx";
import { resetCart, setCart } from "../redux/cartSlice.jsx";
import { clearCart } from "../redux/counterSlice.jsx";
import { orderSchema } from "../schema/orderSchema.jsx";

const FormOrder = () => {
  const { userName } = useContext(UserContext);
  const { setOrderId, setOrderDetails } = useContext(OrderDetailsContext);
  const items = useSelector((state) => state.counter.items);
  const cart = useSelector((state) => state.cart.currentCart);
  const totalItemsPrice = useSelector((state) => state.counter.totalItemsPrice);
  const [isPrioritized, setIsPrioritized] = useState(false);
  const [finalPrice, setFinalPrice] = useState(totalItemsPrice);
  const [postOrder, { isError }] = usePostOrderMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    handleSubmit,
    control,
    trigger,
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
    const isValid = await trigger();
    if (isValid) {
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
          totalPrice: item.totalItemPrice,
          unitPrice: item.unitPrice,
          ingredients: item.ingredients,
        })),
      };

      try {
        const response = await postOrder(orderPayload).unwrap();
        console.log(response);

        if (response.status !== "success") {
          throw new Error("Error");
        }

        dispatch(setCart(response));
        setIsPrioritized(!isPrioritized);
        setFinalPrice(
          (totalItemsPrice + response.data.priorityPrice).toFixed(2)
        );
      } catch (e) {
        console.error(e);
      }
    }
  };

  const onSubmit = async (data) => {
    const orderPayload = {
      address: data.address,
      customer: data.firstName,
      phone: data.phoneNumber,
      priority: isPrioritized ? true : false,
      position: "",
      cart: items.map((item) => ({
        pizzaId: item.id,
        name: item.name,
        quantity: item.qty,
        totalPrice: item.totalItemPrice,
        unitPrice: item.unitPrice,
        ingredients: item.ingredients,
      })),
    };

    try {
      const response = await postOrder(orderPayload).unwrap();
      console.log(response);

      if (response.status !== "success") {
        throw new Error("Error");
      }

      setOrderId(response.data.id);
      setOrderDetails((prevOrderDetails) => [
        ...prevOrderDetails,
        response.data,
      ]);

      navigate(`/pizza-app-redux-toolkit-rtk-query/order/${response.data.id}`);
      dispatch(clearCart());
      dispatch(resetCart());
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      {isError ? (
        <h1 className="order__error_bold">
          "Some issues have occurred 😔 Please, contact us on 000 555 33 22"
        </h1>
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
                ORDER NOW FOR €{totalItemsPrice.toFixed(2)}
              </button>
            )}
          </form>
        </div>
      )}
    </>
  );
};

export default FormOrder;
