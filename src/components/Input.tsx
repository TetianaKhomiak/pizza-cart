import { useController } from "react-hook-form";
import type { InputProps } from "../types/types";

function Input({
  name,
  control,
  className,
  id,
  type,
  setUserName,
  placeholder,
}: InputProps) {
  const { field } = useController({ name, control });
  return (
    <input
      type={type}
      id={id}
      className={className}
      placeholder={placeholder}
      {...field}
      onChange={(e) => {
        field.onChange(e.target.value);
        if (setUserName) {
          setUserName(e.target.value);
        }
      }}
    />
  );
}

export default Input;
