import { useController } from "react-hook-form";

function Input({
  name,
  control,
  className,
  id,
  type,
  setUserName,
  placeholder,
}) {
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
