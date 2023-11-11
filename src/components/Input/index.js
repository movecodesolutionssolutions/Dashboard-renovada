import React, { useRef, useEffect } from "react";
import { useField } from "@unform/core";
import * as C from "./styles";

const Input = ({ name, label, type, placeholder, value, onChange }) => {
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
    <C.Input
      ref={inputRef}
      name={fieldName}
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
    />
  );
};

export default Input;
