import { CSSProperties, ReactNode } from "react";

interface ISimpleButtonProps {
  children: ReactNode;
  type?: "button" | "submit" | "reset";
  handleClick?: () => void;
  style?: CSSProperties;
  disabled?: boolean;
}

export function SimpleButton({
  handleClick,
  children,
  type,
  style,
  disabled,
}: ISimpleButtonProps) {
  return (
    <button
      onClick={handleClick}
      type={type}
      style={style}
      disabled={disabled}
      className="bg-indigo-600 px-5 py-3 text-sm text-white font-bold uppercase rounded shadow-md hover:bg-indigo-700 hover:shadow-lg transition duration-300 disabled:cursor-not-allowed disabled:bg-gray-500"
    >
      {children}
    </button>
  );
}
