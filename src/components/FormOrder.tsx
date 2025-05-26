import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAppSelector, useAppDispatch } from "../api/hooks.ts";
import { useNavigate } from "react-router-dom";
import { usePostOrderMutation } from "../api/apiSlice.ts";
import Input from "./Input.tsx";
import { useOrderDetailsContext } from "../context/OrderDetailsProvider.tsx";
import { useUserNameContext } from "../context/UserNameProvider.tsx";
import { resetCart, setCart } from "../redux/cartSlice.ts";
import { clearCart } from "../redux/counterSlice.ts";
import { OrderFormData, orderSchema } from "../schema/orderSchema.ts";
import type { Order, OrderPayloadForm } from "../types/types.ts";

const FormOrder = () => {
  const { userName } = useUserNameContext();
  const { setOrderId, setOrderDetails } = useOrderDetailsContext();
  const items = useAppSelector((state) => state.counter.items);
  const totalItemsPrice = useAppSelector(
    (state) => state.counter.totalItemsPrice
  );
  const [isPrioritized, setIsPrioritized] = useState<boolean>(false);
  const [finalPrice, setFinalPrice] = useState<number>(totalItemsPrice);
  const [postOrder, { isError }] = usePostOrderMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    control,
    trigger,
    formState: { errors },
    getValues,
  } = useForm<OrderFormData>({
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
      const orderPayload: OrderPayloadForm = {
        address: data.address,
        customer: data.firstName,
        phone: data.phoneNumber,
        priority: !isPrioritized,
        position: "",
        cart: items.map((item) => ({
          pizzaId: Number(item.id),
          name: item.name,
          quantity: item.qty,
          totalPrice: item.totalItemPrice,
          unitPrice: item.unitPrice,
          ingredients: item.ingredients,
        })),
      };

      try {
        const response = await postOrder(orderPayload).unwrap();

        if (response.status !== "success") {
          throw new Error("Error");
        }

        const cartData = {
          items: response.data.cart.map((item) => ({
            id: item.pizzaId,
            name: item.name,
            unitPrice: item.unitPrice,
            imageUrl: "",
            ingredients: item.ingredients,
            qty: item.quantity,
            totalItemPrice: item.totalPrice,
          })),
          totalItemsAmount: response.data.cart.reduce(
            (sum, item) => sum + item.quantity,
            0
          ),
          totalItemsPrice: response.data.orderPrice,
          priority: response.data.priority,
          priorityPrice: response.data.priorityPrice,
        };

        dispatch(setCart(cartData));
        setIsPrioritized(!isPrioritized);
        setFinalPrice(totalItemsPrice + response.data.priorityPrice);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const onSubmit = async (data: OrderFormData) => {
    const orderPayload: OrderPayloadForm = {
      address: data.address,
      customer: data.firstName,
      phone: data.phoneNumber,
      priority: isPrioritized ? true : false,
      position: "",
      cart: items.map((item) => ({
        pizzaId: Number(item.id),
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
      setOrderDetails((prevOrderDetails: Order[]) => [
        ...prevOrderDetails,
        response.data,
      ]);

      navigate(`/pizza-cart/order/${response.data.id}`);
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
                ORDER NOW FOR €{finalPrice.toFixed(2)}
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
