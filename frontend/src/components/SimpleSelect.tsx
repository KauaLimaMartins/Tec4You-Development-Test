import { ChangeEvent, ReactNode } from "react";

interface SimpleSelectProps {
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  children: ReactNode;
}

export function SimpleSelect({ placeholder, onChange, value, children }: SimpleSelectProps) {
  return (
    <select id="countries" defaultValue="" onChange={onChange} value={value} className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5">
      <option value="" disabled>{placeholder}</option>
      {children}
    </select>
  );
}
