import React, { useRef, useEffect } from "react";
import { useField } from "@unform/core";

const Input = ({ name, label, type, value, onChange }) => {
  const inputRef = useRef(null);
  const { fieldName, defaultValue = "", registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value",
    });
  }, [fieldName, registerField]);

  return (
    <div className="w-full md:w-full px-3 mb-6 md:mb-0 ">
      <label
        className="block uppercase tracking-wide text-gray-500 text-xs  mb-2"
        htmlFor={fieldName}
      >
        {label}
      </label>
      <input
        className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
        ref={inputRef}
        id={fieldName}
        name={fieldName}
        value={value}
        onChange={onChange}
        type={type}
      />
    </div>
  );
};

export default Input;
