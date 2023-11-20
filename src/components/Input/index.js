import React, { useRef, useEffect } from "react";
import { useField } from "@unform/core";

const Input = ({ name, label, type, value, onChange }) => {
  const inputRef = useRef(null);
  const { fieldName, defaultValue = "", registerField, error } = useField(name);

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
        className="block uppercase tracking-wide text-gray-400 text-xs  mb-2"
        htmlFor={fieldName}
      >
        {label}
      </label>
      <input
        className="appearance-none block w-full bg-gray-100 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
        style={{ background: "black", color: "white" }}
        ref={inputRef}
        id={fieldName}
        name={fieldName}
        value={value}
        invalid={error}
        onChange={onChange}
        type={type}
      />
      {error && (
        <span style={{ color: "#f00", display: "block" }}>{error}</span>
      )}
    </div>
  );
};

export default Input;
