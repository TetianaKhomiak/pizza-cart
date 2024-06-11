import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input.jsx";
import { UserContext } from "../context/UserNameProvider.jsx";
import { orderSchema } from "../schema/orderSchema.jsx";
import { OrderSearchContext } from "../context/OrderSearchProvider.jsx";

const FormOrder = () => {
  const { userName } = useContext(UserContext);
  const [error, setError] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  // const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      firstName: userName,
      phoneNumber: "",
      address: "",
    },
    resolver: zodResolver(orderSchema),
  });

  const onSubmit = async (data) => {
    // setError(
    //   "Some issues have occurred 😔 Please, contact us on 000 555 33 22"
    // );
    // }
  };

  const sum = state.totalPrice + 8;

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
              <input type="checkbox" id="priority" />
              <label className="order__label_checkbox" htmlFor="priority">
                Want to give your order priority?
              </label>
            </div>
            {isChecked ? (
              <button className="order__btn">ORDER NOW FOR €</button>
            ) : (
              <button className="order__btn">ORDER NOW FOR €</button>
            )}
          </form>
        </div>
      )}
    </>
  );
};

export default FormOrder;
