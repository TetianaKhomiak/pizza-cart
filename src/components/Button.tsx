import type { ButtonProps } from "../types/types";

function Button(props: ButtonProps) {
  const { text, onClick, className, type } = props;

  return (
    <button className={className} onClick={onClick} type={type}>
      {text}
    </button>
  );
}

export default Button;
