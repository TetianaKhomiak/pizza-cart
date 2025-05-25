import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useUserNameContext } from "../context/UserNameProvider.tsx";
import { loginSchema } from "../schema/loginSchema.ts";
import type { LoginFormData } from "../schema/loginSchema.ts";
import Button from "./Button.tsx";
import Input from "./Input.tsx";

function FormLogin() {
  const navigate = useNavigate();
  const { userName, setUserName } = useUserNameContext();

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<LoginFormData>({
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
