import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserNameProvider.jsx";
import { loginSchema } from "../schema/loginSchema.jsx";
import Button from "./Button.jsx";
import Input from "./Input.jsx";

function FormLogin() {
  const navigate = useNavigate();
  const { userName, setUserName } = useContext(UserContext);

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      fullName: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const handleFormSubmit = () => {
    navigate("/pizza-app-redux-toolkit-rtk-query/menu");
  };

  return (
    <form className="login-form" onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="login-form__error">
        {errors.fullName && <p>{errors.fullName.message}</p>}
      </div>
      <Input
        type="text"
        name="fullName"
        control={control}
        placeholder="Your full name"
        setUserName={setUserName}
      />
      {userName.trim() !== "" && <Button type="submit" text="START ORDERING" />}
    </form>
  );
}

export default FormLogin;
