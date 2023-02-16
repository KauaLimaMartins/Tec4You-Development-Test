import { ChangeEvent } from "react";

interface ISimpleInputProps {
  placeholder: string;
  type: 'text' | 'password' | 'number' | 'email';
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function SimpleInput({
  placeholder,
  type,
  onChange,
  value
}: ISimpleInputProps) {
  return (
    <input
      type={type}
      className="form-control w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white border border-gray-300 rounded transition m-0 focus:text-gray-700 focus:bg-white focus:border-indigo-600 focus:outline-none"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      min="0"
    />
  );
}
